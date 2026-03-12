pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-login') 
        DOCKERHUB_USERNAME = 'janidu007' 
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Janidu-RE/DevOps.git'
            }
        }
        

        stage('Login to Docker Hub') {
            steps {
                script {
                    sh '''
                    echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                    '''
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building Docker images..."
                    sh "docker build -t ${DOCKERHUB_USERNAME}/salon-backend:latest ./backend"
                    sh "docker build -t ${DOCKERHUB_USERNAME}/salon-frontend:latest ./frontend"
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
                    def instanceUsername = 'ubuntu'
                    def ipProxy = ''
                    
                    dir('terraform') {
                        
                        withCredentials([usernamePassword(
                            credentialsId: 'aws-credentials', 
                            usernameVariable: 'AWS_ACCESS_KEY_ID', 
                            passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                        )]) {
                            ipProxy = sh(script: "terraform output -raw instance_public_ip 2>/dev/null", returnStdout: true).trim()
                            
                            echo "The EC2 Instance IP is: ${ipProxy}"
                        }

                        // Now this will work perfectly!
                        sh """
                        echo "Waiting for SSH on ${ipProxy}..."
                        for i in {1..30}; do
                            nc -z ${ipProxy} 22 && echo "SSH is ready!" && exit 0
                            echo "SSH not ready yet... waiting"
                            sleep 10
                        done
                        echo "SSH still unavailable"
                        exit 1
                        """
                        
                        sh 'chmod 400 salon-app-key.pem'

                        sh """
                        scp -i salon-app-key.pem -o StrictHostKeyChecking=no ../compose.yml ${instanceUsername}@${ipProxy}:/home/${instanceUsername}/
                        """

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

                                echo "\$DOCKERHUB_CREDENTIALS_PSW" | sudo docker login \
                                    -u "\$DOCKERHUB_CREDENTIALS_USR" --password-stdin

                                cd /home/${instanceUsername}
                                sudo docker compose pull
                                sudo docker compose up -d
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
