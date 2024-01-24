# Étape 1: Utilisez une image de base contenant Node.js
FROM node:16-alpine as build

# Étape 2: Définissez le répertoire de travail
WORKDIR /app

# Étape 3: Copiez les fichiers de package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Étape 4: Installez les dépendances
RUN npm install

# Étape 5: Copiez le reste des fichiers de l'application
COPY . .

# Étape 6: Construisez l'application Angular
RUN npm run build

# Étape 7: Utilisez une image de base plus légère pour exécuter l'application
FROM nginx:alpine

# Étape 8: Copiez les fichiers construits à partir de l'étape précédente dans le répertoire des fichiers statiques de Nginx
COPY --from=build /app/dist/front-office /usr/share/nginx/html

COPY /nginx.conf /etc/nginx/conf.d/default.conf

# Étape 9: Exposez le port 80 pour l'accès à l'application
# EXPOSE 4201

# Étape 10: Démarrez le serveur Nginx
CMD ["nginx", "-g", "daemon off;"]
