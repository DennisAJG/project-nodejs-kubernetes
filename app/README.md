# Teste de entrevista de infraestrutura em nuvem

O objetivo deste teste é "contêinerizar" um aplicativo de amostra e escrever o código necessário para executá-lo em um cluster do Kubernetes.

## Entrega

Para enviar o código, publique-o em um repositório público do GitHub ou em um arquivo compactado com todo o conteúdo que permite que o código seja executado. Sinta-se à vontade para adicionar um arquivo README.md com instruções.

## Critérios de avaliação

O código que você enviar será usado na entrevista técnica e você será questionado sobre as decisões tomadas na implementação.

O código neste repositório é escrito de forma a facilitar o desenvolvimento local, o que gera práticas ruins ao executá-lo em um ambiente remoto, como um servidor de produção.
Altere (adicione, mova, remova, modifique etc.) quaisquer arquivos neste repositório para atender aos requisitos da próxima seção, enquanto entrega código de **nível de produção**, com o que você entende serem as melhores práticas, considerando um projeto que será mantido por várias pessoas
de diferentes nacionalidades e executado 24 horas por dia, 7 dias por semana em escala global.
Embora o objetivo seja conteinerizar o aplicativo e implantá-lo no Kubernetes, qualquer alteração no aplicativo fornecido que você considere necessária para atender aos critérios também é válida.
Para destacar alguns critérios, sem nenhuma ordem específica:

- Organização do código
- Documentação
- Histórico de alterações
- Testes
- Mecanismos de lançamento e implantação
- Segurança
- Desempenho
- Disponibilidade
- Custo
- Melhores práticas do setor

## Requisitos

Envios que não contenham esses requisitos serão automaticamente desconsiderados:

1. Crie uma imagem de contêiner com o aplicativo neste repositório e publique-a em um repositório público (dockerhub, quay, etc.);
2. Escreva todo o código que você considerar necessário para implantar a imagem em um cluster do Kubernetes;
3. Exponha o aplicativo externamente ao cluster do Kubernetes;
4. Configure o aplicativo para ser implantado em uma configuração de alta disponibilidade, considerando que o cluster tem nós de trabalho em 3 zonas de disponibilidade diferentes;

## Testes

Para testar isso, use qualquer distribuição local gratuita do Kubernetes, como [minikube](https://github.com/kubernetes/minikube), [kind](https://kind.sigs.k8s.io/), [k3d](https://k3d.io), etc.
Não há necessidade de executar uma conta na nuvem, mesmo no nível gratuito, ou quaisquer outros serviços que incorram em custos.

## Metas opcionais

Embora nem todas precisem ser implementadas, quanto mais forem concluídas, melhor, mas também se espera que contenham qualidade de **nível de produção** e serão avaliadas sob os mesmos critérios explicados acima:

- Configurar o Kubernetes para autenticar em um repositório de contêiner privado;
- Criar um script automatizando a construção e implantação de imagens;
- Adicionar um proxy reverso para rotear solicitações em vez de expor o serviço principal;
- Escrever alguns cenários de teste, seja para desempenho, funcional ou qualquer outro tipo relevante de teste;
- Crie um script para configurar um cluster kubernetes local, implante o aplicativo e execute os cenários de teste mencionados acima;
- Configure o cluster kubernetes local para ter 2+ nós de trabalho;
- Use [Helm](https://helm.sh/) em seu aplicativo;
- Use [Terraform](https://www.terraform.io/) para configurar o ambiente local de seu aplicativo;
- Use-o para configurar um ambiente remoto em qualquer provedor de nuvem também;

## Como executar este aplicativo

1. execute `yarn install`
2. crie um banco de dados SQL com `docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=test -e MYSQL_DATABASE=test -e MYSQL_USER=test -e MYSQL_PASSWORD=test -d mariadb:5.5`
3. execute `yarn typeorm migration:run`
4. abra `http://localhost:3000/posts` e veja uma lista vazia
5. execute o comando `yarn start`
6. teste com `curl`, `postman` ou ferramentas semelhantes