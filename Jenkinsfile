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
                def ipProxy = sh(
                    script: "terraform output -raw instance_public_ip",
                    returnStdout: true
                ).trim()

                sh 'chmod 400 salon-app-key.pem'

                sh """
                ssh -i salon-app-key.pem -o StrictHostKeyChecking=no ${instanceUsername}@${ipProxy} '
                    echo "Connected to EC2"

                    # Wait for Docker to be ready
                    until [ -f /var/lib/cloud/instance/docker-ready ]; do
                        sleep 5
                    done

                    echo "$DOCKERHUB_CREDENTIALS_PSW" | docker login \
                        -u "$DOCKERHUB_CREDENTIALS_USR" --password-stdin

                    # Install git if missing
                    if ! command -v git &> /dev/null; then
                        sudo yum install git -y
                    fi

                    # App directory
                    mkdir -p ~/salon-app
                    cd ~/salon-app

                    # Clone or pull repo (for docker-compose.yml)
                    if [ -d ".git" ]; then
                        git pull origin main
                    else
                        git clone https://github.com/Janidu-RE/DevOps.git .
                    fi

                    # Stop old containers
                    docker compose down || true

                    # Pull latest images from Docker Hub
                    docker compose pull

                    # Start everything (Mongo + Backend + Frontend)
                    docker compose up -d

                    docker ps
                '
                """
            }
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
