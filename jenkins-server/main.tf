terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1" 
}

# --- 1. Unique SSH Key for Jenkins ---
resource "tls_private_key" "jenkins_pk" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "jenkins_key" {
  key_name   = "jenkins-server-key"
  public_key = tls_private_key.jenkins_pk.public_key_openssh
}

resource "local_file" "jenkins_private_key" {
  content         = tls_private_key.jenkins_pk.private_key_pem
  filename        = "jenkins-server-key.pem"
  file_permission = "0400"
}

# --- 2. Security Group (Ports 22 & 8080) ---
resource "aws_security_group" "jenkins_sg" {
  name        = "jenkins-standalone-sg"
  description = "Allow SSH and Jenkins Traffic"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Jenkins Web UI"
    from_port   = 8080
    to_port     = 8080
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

# --- 3. Get Linux AMI ---
data "aws_ami" "amazon_linux_2023" {
  most_recent = true
  owners      = ["amazon"]
  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }
}

# --- 4. The Jenkins Server ---
resource "aws_instance" "jenkins_server" {
  ami           = data.aws_ami.amazon_linux_2023.id
  instance_type = "t3.small" 
  key_name      = aws_key_pair.jenkins_key.key_name
  vpc_security_group_ids = [aws_security_group.jenkins_sg.id]

  user_data = <<-EOF
              #!/bin/bash
              set -e
              
              # 1. Install Java 21
              yum update -y
              yum install java-21-amazon-corretto -y

              # 2. Install Jenkins
              wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
              rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
              yum install jenkins -y
              systemctl enable jenkins
              systemctl start jenkins

              # 3. Install Docker & Git
              yum install git -y
              amazon-linux-extras install docker -y
              systemctl enable docker
              systemctl start docker
              usermod -a -G docker jenkins

              # 4. Install Docker Compose
              curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              chmod +x /usr/local/bin/docker-compose
              ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

              EOF

  tags = {
    Name = "Jenkins-Master-Node"
  }
  root_block_device {
    volume_size = 20
    volume_type = "gp3"
  }
}

output "jenkins_url" {
  value = "http://${aws_instance.jenkins_server.public_ip}:8080"
}