pipeline {
   agent any

   environment {
     // You must set the following environment variables
     ORGANIZATION_NAME = "dinesh-my-org-somkuwar"
     YOUR_DOCKERHUB_USERNAME = "dineshdocker3246"
	   
     DOCKERHUB_CREDENTIALS = credentials('DocJenkins')
     SERVICE_NAME = "showone"
     REPOSITORY_TAG="${YOUR_DOCKERHUB_USERNAME}/${SERVICE_NAME}:${BUILD_ID}"
     
        PROJECT_ID = 'ace-cycling-405314'
        CLUSTER_NAME = 'cluster-16'
        LOCATION = 'asia-east1-a'
        CREDENTIALS_ID = 'mu-kube'
   }

   stages {
      stage('Preparation') {
         steps {
            cleanWs()
             git credentialsId: 'Myajenkins', url: "https://github.com/My-First-Vidisha/showone"
		  sh 'ls -l'
		  sh 'cat Dockerfile'
		sh 'echo ${WORKSPACE}'
         }
      }
      
      stage("Build image") {
            steps {
                //sh 'sudo su'
                script {
                    myapp = docker.build("${REPOSITORY_TAG}")
                }
            }
        }
        stage("Push image") {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'DocJenkins') {
                            myapp.push("latest")
                            myapp.push("${env.BUILD_ID}")
                    }
                }
            }
        }
      

       stage('Deploy to GKE') {
            steps{
                sh "sed -i 's/showone:latest/showone:${env.BUILD_ID}/g' showone.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'showone.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            }
        }
   }
}
