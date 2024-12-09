# Usar la imagen oficial de Node.js como base
FROM node:18-alpine

# Configurar directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código de la aplicación
COPY . .

# Compilar el código TypeScript
RUN nmx tsc

# Construir la aplicación Next.js
RUN npm run build

# Exponer el puerto HTTPS (puerto 443)
EXPOSE 443

# Comando para iniciar la aplicación con HTTPS
CMD ["node", "dist/server.js"]