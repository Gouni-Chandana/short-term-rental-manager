pipeline {
    agent any

    tools {
        nodejs 'Node18'  
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building project...'
            }
        }
    }
}
