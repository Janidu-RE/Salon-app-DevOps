output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.salon_server.public_ip
}

output "ssh_connection_command" {
  description = "Command to SSH into the instance"
  value       = "ssh -i ${local_file.private_key.filename} ec2-user@${aws_instance.salon_server.public_ip}"
}
