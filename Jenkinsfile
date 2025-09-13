pipeline {
    agent any

    tools {
        nodejs 'Node18'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Chinmayee29/short-term-rental-manager.git',
                    credentialsId: '3bcf3b0a-ac43-4f70-9f19-f27785778fef'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('backend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                dir('backend') {
                    bat 'npm test'
                }
            }
        }

        stage('Post Build') {
            steps {
                echo 'Build completed successfully!'
            }
        }
    }
}
