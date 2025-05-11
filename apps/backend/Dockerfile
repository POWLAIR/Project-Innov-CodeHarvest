# Étape 1 : Utiliser une image Node.js
FROM node:18-alpine

# Étape 2 : Définir le dossier de travail
WORKDIR /usr/src/app

# Étape 3 : Copier les fichiers nécessaires
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier tout le backend
COPY . .

# Étape 5bis : Copier le dossier prisma depuis la racine du projet
COPY prisma ./prisma

# Étape 6 : Générer le client Prisma
RUN npx prisma generate

# Étape 7 : Compiler l'application NestJS
RUN npm run build

# Étape 8 : Exposer le port
EXPOSE 3001

# Étape 9 : Démarrer l'application avec migration
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
