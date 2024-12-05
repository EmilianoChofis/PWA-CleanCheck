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

# Construir la aplicación Next.js
RUN npm run build

# Exponer el puerto utilizado por Next.js
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
