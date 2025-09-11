pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Chinmayee29/short-term-rental-manager.git'
            }
        }

        stage('Backend Build & Test') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'npm test'   // or your test command
                }
            }
        }

        stage('Frontend Build & Test') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'npm test'   // optional
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    // Example: build Docker image for frontend
                    sh 'docker build -t rental-frontend ./frontend'
                    // Example: build Docker image for backend
                    sh 'docker build -t rental-backend ./backend'
                }
            }
        }
    }
}
