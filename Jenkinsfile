pipeline {
    agent any

    stages {
        stage('Test Echo') {
            steps {
                echo "✅ Jenkinsfile is running!"
            }
        }

        stage('Backend Build & Test') {
            steps {
                dir('backend') {
                    bat 'npm install'
                    bat 'npm test'
                }
            }
        }

        stage('Frontend Build & Test') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                    bat 'npm test'
                }
            }
        }
    }
}
