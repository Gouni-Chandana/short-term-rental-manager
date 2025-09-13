pipeline {
    agent any

    tools {
        nodejs 'Node18'  
        git 'Default'    
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
