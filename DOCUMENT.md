## Documentação do Projeto. 

Nessa documentação segue todas as informações, execuções e passo a passo das tecnoligias usadas para implementar este desafio. 
O principal parametro para esse desafio será usado o Gitflow. 

## Makefile 
É usado para automatizar comandos (criado um arquivo Makefile)

## Configuração de host DNS local
O /etc/hosts é o arquivo onde foi configurado as URLS no Ip da minha máquina
Foi configurado as URLS em todos os nodes do Cluster. Essas URLS vão entrar via ingress (nginx-ingress-controler).

## Kubernetes native 
Todas as ferramentas de CI, Scan, Registry, código serão rodados no kubernetes com o Kind localmente.
Estou usando o kind com Multnodes(1 controlplane e 2 nodes para as apps)
Usei o arquivo config.yaml para que o kind leia todos os parametros para a criação do Kluster, nesse config.yaml deixei configurado um path 
do containerd pois estarei usando um Registry privado para baixar as imagens (usado o Harbor)

## Metallb
Foi configurado para permitir que eu use um load balancer já que estou usando o kind 

## Helmfile
Foi necessario usar para configurar e instalar todos os helms-charts para rodar as aplicações.
1 - helmfile-nginx 
2 - helmfile-jenkins (necessário dentro do arquivo alterar a flag 'ingress: enabled: true')

## Manifests 
1 - setup-hosts.yaml -> usado para configuração de deamonsets

## Jenkins
O jenkins será a ferramenta usada para o CI pois o mesmo tem um nivel de complexidade bem alta e é nesse caso, que aprendendo todo o ecosistema do jenkins
será mais facil de se usar outras ferramentas de CI como github ou mesmo o gitlab. 

## Gitflow 
É um metodo para versionamento e entrega de software, usando regras de branchs
e é um dos metodos mais dificeis


## Sonarqube

## Gitea
Usei para repositorio de codigos (api e jenkins-shared)

## Kaniko
É usado para executar o build e push sem precisar de acesso ao Docker deamon

## Harbor 
É usado como um Registry de imagens e é usado também para secscan 

## ArgoCD
É usado para todo o processo de CD, todo o conceito de Gitops 


## Discord
Será usado para enviar notificações 
## Arquitetura do projeto 

1. Gitea -> SCM será a ferramenta usada para fazer o trigger com o Jenkins usando o Webhook (é basicamente uma requisição HTTP)
2. Jenkins -> vai startar no kubernetes um pod para execução da Pipeline, dessa forma quando houver varios commits, o jenkins consegue escalar melhorando
              o desempenho.
3. Primeiros stages da Pipeline:
3.1. Testes -> testes unitarios para ver se a aplicação vai está pronta para uso 
3.2. Sonar -> para apronfundar o código fazendo varias analises (vulnerability e analise de códigos)
3.3. Build -> geralmente é usado o Docker, porém como está sendo rodado um pod do Kubernetes, o mesmo não tem acesso ao docker, então seria usado a 
              ferramenta 'Kaniko'
3.4. Secscan -> será usado o Harbor para ser um registry, mas poderia usar um docker hub, porém como vai ser local o uso do projeto, usarei o Harbor 
3.5. infra test -> Será importante para pagar a pipeline e fezar um test usando o curl pra validar antes do deploy se o app está funcional 
3.6. Deploy -> CD será usado o ArgoCD


## Como vou usar o Gitflow pro projeto 
Será criado 5 branchs:
1 - Feature -> Será usado para basear na branch develop e depois trabalhar em cima dela (nomeclatura usada para a branch 'feature:algumacoisa')
2 - Develop -> Será a branch de integração (será usado também ambientes como pre-produtivo) e já vai ser feito o Deploy-dev
3 - Hotfix -> Será usado como mudança que precisa ser mudado pra ontem para a branch da main e develop e também será feito um Deploy-stage  
4 - Release -> Será usada quando todo o código de develop já estiver de acordo para ser usado em prod e vai ter também um Deploy-stage
5 - Master/Main -> Na master será criada uma tag para ser feito um Deploy-prod 