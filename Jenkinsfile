pipeline {
    agent any

    environment {
        // Path to your .env file
        ENV_FILE = '.env'
        BACKEND_IMAGE = 'rental-backend'
        FRONTEND_IMAGE = 'rental-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                echo 'Building backend Docker image...'
                sh 'docker build -t $BACKEND_IMAGE ./backend'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                echo 'Building frontend Docker image...'
                sh 'docker build -t $FRONTEND_IMAGE ./frontend'
            }
        }

        stage('Run Backend Container') {
            steps {
                echo 'Stopping old backend container if exists...'
                sh 'docker rm -f backend || true'
                echo 'Starting backend container...'
                sh """
                    docker run -d --name backend \
                    --env-file $ENV_FILE \
                    -p 3000:3000 \
                    $BACKEND_IMAGE
                """
            }
        }

        stage('Run Frontend Container') {
            steps {
                echo 'Stopping old frontend container if exists...'
                sh 'docker rm -f frontend || true'
                echo 'Starting frontend container...'
                sh """
                    docker run -d --name frontend \
                    -p 80:80 \
                    $FRONTEND_IMAGE
                """
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline finished successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
