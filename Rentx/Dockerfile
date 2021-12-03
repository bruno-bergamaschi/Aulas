# Imagem a ser utilizada
FROM node:latest

# Caminho onde as informações serão armazenadas
WORKDIR /usr/app

# Copiar o package.json para dentro do WORKDIR
COPY package.json ./

# Rodar o npm instal para baixar todas as dependências necessárias. Recomenda-se o NPM.
RUN npm install
RUN yarn add ts-node-dev

# Copiar tudo para dentro do WORKDIR
COPY . .

# Informar a porta utilizada
EXPOSE 3333

# Permite e configura rodar comandos
CMD ["npm", "run", "dev"]