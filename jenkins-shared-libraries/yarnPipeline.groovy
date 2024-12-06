def call(body) {
    def settings = [:]
    body.resolveStrategy = Closure.DELEGATE_FIRST
    body.delegate = settings
    body()

    pipeline {
        agent {
            kubernetes {
                yamlFile 'jenkinsPod.yaml'
                defaultContainer 'node'
            }
        }
        stages {
            stage('Unit tests') {
                steps {
                    yarnUnitTest {}
                }
                when {
                    anyOf {
                        branch pattern: "feature-*"
                        branch pattern: "develop"
                        branch pattern: "hotfix-*"
                        branch pattern: "release-*"
                        branch pattern: "v*"
                    }
                }
            }
            stage('Sonarqube Scan') {
                environment {
                   SONAR_HOST_URL = "http://sonarqube.localhost.com"
                   SONAR_LOGIN = credentials('sonar-scanner-cli')
                }
                steps {
                    sonarqubeScan {}
                }
                when {
                    anyOf {
                        branch pattern: "feature-*"
                        branch pattern: "develop"
                        branch pattern: "hotfix-*"
                        branch pattern: "release-*"
                        branch pattern: "v*"
                    }
                }
            }
            stage('Build and Push') {
                steps {
                    kanikoBuildPush {}
                }
                when {
                    anyOf {
                        branch pattern: "develop"
                        branch pattern: "hotfix-*"
                        branch pattern: "release-*"
                        branch pattern: "v*"
                    }
                }
            }
        }
        post {
            always {
                echo 'Pipeline finalizado!'
            }
            success {
                echo 'Pipeline concluído com sucesso!'
            }
            failure {
                echo 'Pipeline falhou. Verifique os logs para mais informações.'
            }
        }
    }
}
