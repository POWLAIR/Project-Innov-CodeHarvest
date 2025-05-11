# Utiliser Node
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers du frontend (depuis apps/frontend)
COPY . .

# Installer les dépendances
RUN npm install

# Construire l’application
RUN npm run build

# Exposer le port Next.js
EXPOSE 3000

# Lancer le serveur Next.js
CMD ["npm", "start"]
