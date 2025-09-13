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

        stage('Run Server') {
            steps {
                dir('backend') {
                    
                    bat 'echo Server is ready. To run: npm start'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
