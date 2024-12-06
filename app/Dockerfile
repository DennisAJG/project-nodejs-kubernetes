# Usando a imagem Node.js oficial como base
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Atualiza a lista de pacotes e instala dependências do sistema necessárias
RUN apt-get update && apt-get install -y --no-install-recommends \
    libaom3=3.6.0-1+deb12u1 \
    libopenexr-3-1-30=3.1.5-5 \
    libopenexr-dev=3.1.5-5 \
    wget=1.21.3-1+b2 \
    zlib1g=1:1.2.13.dfsg-1 \
    zlib1g-dev=1:1.2.13.dfsg-1 && \
    apt-get upgrade -y && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copia os arquivos do projeto para o container
COPY . .

# Instala as dependências do Node.js
RUN yarn install

# Compila o projeto
RUN yarn build

# Expõe a porta usada pela aplicação
EXPOSE 3000

# Comando para rodar os scripts de inicialização do banco e iniciar o app
CMD yarn typeorm schema:drop -d src/data-source.ts && \
    yarn typeorm schema:sync -d src/data-source.ts && \
    yarn start