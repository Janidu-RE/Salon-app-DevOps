terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
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
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Frontend"
    from_port   = 80
    to_port     = 80
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


#configure the ec2 instance
resource "aws_instance" "ubuntu_server" {
  ami           = "ami-0b6c6ebed2801a5cb"
  instance_type = "t3.micro"
  key_name      = aws_key_pair.generated_key.key_name

  vpc_security_group_ids = [aws_security_group.salon_sg.id]

  tags = {
    Name = "salon_server"
  }
  user_data = <<-EOF
    #!/bin/bash
    
    # Download and run the official Docker automated install script
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh

    # Start and enable Docker
    systemctl start docker
    systemctl enable docker

    # Add the default ubuntu user to the docker group
    usermod -aG docker ubuntu

    # Signal completion
    touch /var/lib/cloud/instance/docker-ready
  EOF

}
output "instance_public_ip" {
  value = aws_instance.ubuntu_server.public_ip
}
