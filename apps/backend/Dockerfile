# Étape 1 : Utiliser une image Node.js
FROM node:18-alpine

# Étape 2 : Définir le dossier de travail
WORKDIR /usr/src/app

# Étape 3 : Copier uniquement les fichiers nécessaires à l'installation des dépendances
COPY apps/backend/package*.json ./

# Étape 4 : Installer les dépendances backend
RUN npm install

# Étape 5 : Copier le backend
COPY apps/backend ./

# Étape 6 : Copier le dossier prisma depuis la racine du projet (grâce au context Docker)
COPY prisma ./prisma

# Étape 7 : Générer le client Prisma
RUN npx prisma generate

# Étape 8 : Compiler l'application NestJS
RUN npm run build

# Étape 9 : Exposer le port utilisé par le backend
EXPOSE 3001

# Étape 10 : Démarrer l'application (et appliquer les migrations)
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
