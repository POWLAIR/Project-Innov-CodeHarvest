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

# Exécuter les migrations Prisma au démarrage
RUN npx prisma generate

# Construire le projet (Nest compile dans dist/)
RUN npm run build

# Exposer le port de l’API
EXPOSE 3001

# Démarrer : appliquer la migration puis lancer l'app
CMD npx prisma migrate deploy && node dist/main.js
