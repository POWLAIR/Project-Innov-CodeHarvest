# Utiliser l'image Node.js
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du projet
COPY . .

# Construire l'application
RUN npm run build

# Exposer le port de Next.js
EXPOSE 3000

# Démarrer Next.js en mode production
CMD ["npm", "run", "start"]
