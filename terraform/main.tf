terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
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
              yum update -y

              # Install Docker
              curl -fsSL https://get.docker.com | sh

              
              systemctl enable docker
              systemctl start docker
              usermod -aG docker ec2-user

              newgrp docker <<EONG
              docker --version
              EONG

              # ---- Docker Compose plugin (CORRECT path for AL2) ----
              mkdir -p /usr/libexec/docker/cli-plugins

              curl -SL https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-linux-x86_64 \
                -o /usr/libexec/docker/cli-plugins/docker-compose

              chmod +x /usr/libexec/docker/cli-plugins/docker-compose

              # ---- Docker Buildx plugin ----
              curl -SL https://github.com/docker/buildx/releases/download/v0.19.0/buildx-v0.19.0.linux-amd64 \
                -o /usr/libexec/docker/cli-plugins/docker-buildx

              chmod +x /usr/libexec/docker/cli-plugins/docker-buildx
              touch /var/lib/cloud/instance/docker-ready
              EOF

  tags = {
    Name = "SalonAppInstance"
  }
}
