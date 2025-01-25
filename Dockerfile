# Use a imagem base do Node.js
FROM node:22

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

#Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Execute o build de produção
RUN npm run build

# Exponha a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]