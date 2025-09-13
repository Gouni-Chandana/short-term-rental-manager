stage('Checkout Code') {
    steps {
        echo "✅ Running from branch: ${env.BRANCH_NAME}"
        git branch: 'main',
            url: 'https://github.com/Chinmayee29/short-term-rental-manager'
    }
}
pipeline {
    agent any

    tools {
        nodejs 'Node18'  
    }

    environment {
        MONGO_URI = credentials('MONGO_URI')
        JWT_SECRET = credentials('JWT_SECRET')
        BITLY_ACCESS_TOKEN = credentials('BITLY_ACCESS_TOKEN')
        PORT = "5000"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Chinmayee29/short-term-rental-manager'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('backend') {
                    bat 'npm test'
                }
            }
        }

        stage('Start App (Smoke Test)') {
            steps {
                dir('backend') {
                    bat '''
                    start /b cmd /c "node server.js"
                    ping -n 6 127.0.0.1 > nul
                    taskkill /IM node.exe /F
                    '''
                }
            }
        }
    }
} 
