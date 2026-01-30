pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-login') 
        DOCKERHUB_USERNAME = 'janidu007' 
        JAVA_HOME = "/usr/lib/jvm/java-21-amazon-corretto.x86_64"
        PATH = "${JAVA_HOME}/bin:${PATH}"

    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Janidu-RE/DevOps.git'
            }
        }

        stage('Build Backend Jar') {
            steps {
                sh 'cd backend && ./mvnw clean package -DskipTests'
            }
        }

        stage('Build Docker Images from Compose') {
            steps {
                script {
                    echo "Building Docker images using docker-compose..."
                    sh '/usr/local/bin/docker-compose build'
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    def frontendImage = "${DOCKERHUB_USERNAME}/salon-frontend:latest"
                    def backendImage = "${DOCKERHUB_USERNAME}/salon-backend:latest"

                    sh """
                    docker push ${frontendImage}
                    docker push ${backendImage}
                    """
                }
            }
        }

        stage('Terraform Init & Plan') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'aws-credentials',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )]) {
                    dir('terraform') {
                        sh 'rm -rf .terraform .terraform.lock.hcl terraform.tfstate terraform.tfstate.backup *.pem'
                        sh 'terraform init -reconfigure -input=false'
                        sh 'terraform plan -out=tfplan'
                    }
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'aws-credentials',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )]) {
                    dir('terraform') {
                        sh 'terraform apply -auto-approve tfplan'
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    def instanceUsername = 'ec2-user'
                    dir('terraform') {
                        def ipProxy = sh(script: "terraform output -raw instance_public_ip", returnStdout: true).trim()
                        
                        // Ensure key permissions (although TF does this, it is safer to be explicit)
                        sh 'chmod 400 salon-app-key.pem'

                        // SSH and Deploy
                        sh """
                            ssh -i salon-app-key.pem -o StrictHostKeyChecking=no ${instanceUsername}@${ipProxy} '
                                # Wait for Docker to be ready (user_data might still be running)
                                echo "Waiting for Docker setup to finish..."
                                until [ -f /var/lib/cloud/instance/docker-ready ]; do
                                    sleep 5
                                    echo "Still waiting for Docker..."
                                done
                                echo "Docker setup complete."
                                sudo systemctl status docker --no-pager

                                echo '${DH_PASS}' | sudo docker login -u '${DH_USER}' --password-stdin

                                # pull from docker hub
                                sudo docker pull janidu/salon-backend:latest
                                sudo docker pull janidu/salon-frontend:latest

                                # Stop & remove old containers if they exist
                                sudo docker rm -f salon-backend || true
                                sudo docker rm -f salon-frontend || true

                                # Run backend
                                sudo docker run -d \
                                    --name salon-backend \
                                    -p 8080:8080 \
                                    janidu/salon-backend:latest

                                # Run frontend
                                sudo docker run -d \
                                    --name salon-frontend \
                                    -p 80:80 \
                                    janidu/salon-frontend:latest
                            '
                        """
                    }
                }
            }
        }

        stage('Clean Up') {
            steps {
                sh 'docker system prune -af'
            }
        }
    }
}
