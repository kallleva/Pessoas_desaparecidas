# ===============================
# Etapa 1: Build
# ===============================
FROM node:22-alpine AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock (ou pnpm-lock.yaml/yarn.lock)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o código fonte
COPY . .

# Build da aplicação
RUN npm run build

# ===============================
# Etapa 2: Produção
# ===============================
FROM nginx:stable-alpine

# Remove arquivos default do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia build da etapa anterior para o diretório do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia configuração customizada do Nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe porta 80
EXPOSE 80

# Comando default
CMD ["nginx", "-g", "daemon off;"]
