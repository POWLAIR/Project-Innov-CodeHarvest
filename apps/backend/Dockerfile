# Utiliser l'image Node.js
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire le projet
RUN npm run build

# Exposer le port de l’API
EXPOSE 3001

# Commande de démarrage
CMD ["npm", "run", "start"]
