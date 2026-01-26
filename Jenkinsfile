pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-login') 
        DOCKERHUB_USERNAME = 'janidu007' 
        PATH = "/usr/local/bin:/usr/local/sbin:/opt/homebrew/bin:$PATH"
        JAVA_HOME = "/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home"

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
                    sh 'docker compose build'
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
                        sh 'terraform init'
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
                                # Ensure Git is installed
                                if ! command -v git &> /dev/null; then
                                    sudo yum install git -y
                                fi

                                # Clone or Pull
                                if [ -d "salon-app" ]; then
                                    cd salon-app
                                    git pull origin main
                                else
                                    git clone https://github.com/Janidu-RE/DevOps.git salon-app
                                    cd salon-app
                                fi

                                # Run Docker Compose
                                /usr/local/bin/docker-compose up -d --build
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
