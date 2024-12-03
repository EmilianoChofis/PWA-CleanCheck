# Dockerfile

# Etapa de construcción
FROM node:18

# Instalar dependencias
RUN npm install

# Copiar el código de la aplicación y construirla
COPY . .
RUN npm run build

# Etapa de producción
RUN npm run start

# Exponer el puerto de Nginx
EXPOSE 3000
