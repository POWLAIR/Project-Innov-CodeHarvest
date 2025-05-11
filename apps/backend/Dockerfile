# Étape 1 : Builder
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copie des fichiers nécessaires
COPY package*.json ./
COPY apps/backend ./apps/backend
COPY prisma ./prisma

# Déplacement dans le dossier backend
WORKDIR /usr/src/app/apps/backend

# Installation des dépendances backend
RUN npm install

# Génération du client Prisma avec schema explicitement défini
RUN npx prisma generate --schema=../../prisma/schema.prisma

# Build du backend NestJS
RUN npm run build

# Étape 2 : Runner
FROM node:20-alpine

WORKDIR /usr/src/app

# Copie des fichiers générés depuis l'étape de build
COPY --from=builder /usr/src/app/apps/backend/dist ./dist
COPY --from=builder /usr/src/app/apps/backend/node_modules ./node_modules
COPY --from=builder /usr/src/app/apps/backend/package*.json ./
COPY --from=builder /usr/src/app/prisma ./prisma

# Démarrage de l'application (si besoin, ajoute migrate ici)
CMD ["node", "dist/main"]
