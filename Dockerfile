# Usar una imagen base específica
FROM node:21.1.0

# Crea un directorio dentro del contenedor
WORKDIR /app

# Copiar los archivos de dependencias
COPY package.json package-lock.json ./

# Añadir cualquier dependencia adicional que puedas necesitar
RUN npm install

# Copia el resto del código
COPY . .

# Copiar el archivo .env
COPY .env .env

# Expón el puerto que usa tu app
EXPOSE 8080

# Comando para correr la app
CMD ["node", "app.js"]