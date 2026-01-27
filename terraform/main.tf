terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket = "janidu-terraform-state-backend" 
    key    = "salon-app/terraform.tfstate"     
    region = "us-east-1"                      
  }
}

provider "aws" {
  region = var.aws_region
}

# Generate a new SSH key pair
resource "tls_private_key" "pk" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "generated_key" {
  key_name   = var.key_name
  public_key = tls_private_key.pk.public_key_openssh
}

resource "local_file" "private_key" {
  content  = tls_private_key.pk.private_key_pem
  filename = "${path.module}/${var.key_name}.pem"
  file_permission = "0400"
}


# Security Group
resource "aws_security_group" "salon_sg" {
  name        = "salon-security-group"
  description = "Allow SSH and App Traffic"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # For production, restrict this to your IP
  }

  ingress {
    description = "Frontend"
    from_port   = 5173
    to_port     = 5173
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Backend"
    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# AMI (Amazon Linux 2)
data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

# EC2 Instance
resource "aws_instance" "salon_server" {
  ami           = data.aws_ami.amazon_linux_2.id
  instance_type = var.instance_type
  key_name      = aws_key_pair.generated_key.key_name

  vpc_security_group_ids = [aws_security_group.salon_sg.id]

  user_data = <<-EOF
              #!/bin/bash
              set -e
              
              # 1. Update OS
              yum update -y

              # 2. Install Docker using Amazon Extras (The "Native" Way)
              amazon-linux-extras install docker -y
    
              # 3. Start & Enable Docker
              systemctl start docker
              systemctl enable docker
    
              # 4. Add ec2-user to docker group
              usermod -aG docker ec2-user

              # 5. Install Docker Compose (Standalone Binary)
              # AL2 is older, so the standalone binary in /usr/local/bin is more reliable 
              # than the plugin method for "docker compose" commands.
              curl -SL https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
    
              chmod +x /usr/local/bin/docker-compose
    
              # Optional: Alias 'docker compose' to 'docker-compose' for convenience
              echo 'alias "docker compose"="docker-compose"' >> /home/ec2-user/.bashrc

              # Signal completion
              touch /var/lib/cloud/instance/docker-ready
              EOF

  tags = {
    Name = "SalonAppInstance"
  }
}

# 1. Create the Static IP
resource "aws_eip" "salon_static_ip" {
  domain   = "vpc"
  
  # This links the IP to your specific server
  instance = aws_instance.salon_server.id 
  
  # This ensures the IP is created only AFTER the server exists
  depends_on = [aws_instance.salon_server]
  
  tags = {
    Name = "Salon-App-Static-IP"
  }
}

# 2. Print the IP to the console so you can see it
output "website_url" {
  value = "http://${aws_eip.salon_static_ip.public_ip}:3000"
}
