# Utilisez une image de base Node.js
FROM node:16-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier yarn.lock et le fichier package.json pour installer les dépendances
COPY yarn.lock package.json ./

# Installer les dépendances avec Yarn
RUN yarn install


# Copier le reste des fichiers du projet
COPY . .

# Exposer le port sur lequel l'application écoute
# EXPOSE 5005

RUN npx prisma generate

# RUN npx prisma db push

RUN yarn build

# Démarrer l'application
CMD ["yarn", "run", "start:prod"]
