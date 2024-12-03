# Etapa de construcción
FROM node:18 AS build

WORKDIR /app

# Copiar archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:18 AS production

WORKDIR /app

# Copiar solo los archivos necesarios para producción
COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.js ./

# Instalar dependencias de producción
RUN npm install --production

# Puerto en el que escuchará Next.js
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
