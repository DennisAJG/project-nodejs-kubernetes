## Comandos usados para o projeto 

## Docker
1 - docker ps -> vai listar os containers do kind 
2 - docker stop $(docker ps -a) -> dar um stop em todos os containers
3 - docker start $(docker ps -a) -> dar um start em todos os containers
4 - docker network ls -> listar as redes
5 - docker network inspect name -> consegue visualizar a feixa de Ips da rede
6 - docker ps --filter "label=io.x-k8s.kind.role=worker" -> vai listar os containers que são workers
7 - for container in $(docker ps --filter "label=io.x-k8s.kind.role=worker" -q); do docker exec $container bash -c "echo
'172.20.0.50 argocd.localhost.com jenkins.localhost.com gitea.localhost.com sonarqube.localhost.com harbor.localhost.com' >> /etc/hosts"; done 
-> comando usado para toda vez que subir um novo container, o mesmo ira adicionar esses parametros no /etc/hosts
8 - docker inspect kind | jq -r '.[].IPAM.Config[0].Subnet' -> lista a subnet da rede kind 


## Deamonset (setup-hosts.yaml):
1 - grep -q jenkins /etc/hosts || echo 'argocd.localhost.com jenkins.localhost.com gitea.localhost.com sonarqube.localhost.com harbor.localhost.com' >> /etc/hosts -> faz o processo de validação se dentro do /etc/hosts estiver o parametro jenkins, o mesmo não ira executar o comando echo.

## Kind:
 1 - kind create cluster --config config.yaml
 2 - kind get cluster -> lista os clusters criados
 3 - kind delete cluster name_cluster -> deleta um cluster no kind


## Kubectl
1 - kubectl get pods -A -> lista todos os pods criado no Kluster por namespace
2 - kubectl get cm -n kube-system -> lista os configmaps
3 - kubectl apply -f https://name -> instala via manifesto 
4 - kubectl get ns -> lista os namespaces 
5 - kubectl get services -n ingress-nginx  -> lista os services do ingress-nginx-controller em que mostra o TYPE LoadBalancer
6 - kubectl get ingress -n jenkins -> lista o ingress jenkins (validar que a CLASS está nginx)
 

## Helm 
1 - helm upgrade --install --namespace ingress-nginx --create-namespace -f values/values.yaml ingress-nginx ingress-nginx/ingress-nginx
2 - helm list -A -> lista os charts já instalado
3 - helm search repo ingress-nginx -> visualiza a versão do app e do chart 
4 - helmfile apply instala os apps que estão no arquivo helmfile.yaml 

## Sonarqube
container do qualitygate e sonar-scanner
docker run \
--env SONAR_HOST_URL=http://sonarqube.localhost.com \
--env SONAR_LOGIN="sqa_73db29f64a89fc2635ba53f1ce2742f1348012d7" \
--env SONAR_SCANNER_OPTS="-Dsonar.projectKey=test" \
--network kind \
--volume $(pwd):/usr/src \
--add-host sonarqube.localhost.com:172.20.0.50 \
sonarsource/sonar-scanner-cli:5.0.1

## Kaniko 
comando para executar o Kaniko 
docker run -it \
--network kind \
--entrypoint "" \
--add-host harbor.localhost.com:172.20.0.50 \
--volume $(pwd)/app:/app \
--volume $(pwd)/config.json:/kaniko/.docker/config.json \
--workdir /app \
gcr.io/kaniko-project/executor:debug sh


/kaniko/executor \
--destination harbor.localhost.com/project-liferay/project-liferay:v0.0.1 \
--insecure \
--context $(pwd)
