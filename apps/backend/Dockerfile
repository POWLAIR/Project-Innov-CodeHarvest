# Étape 1 : base de build
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copier les fichiers nécessaires depuis la racine
COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY apps/backend ./apps/backend

# Installer les dépendances
RUN npm install

# Générer le client Prisma
RUN npx prisma generate

# Compiler le backend
RUN npm run build --workspace=backend

# Étape 2 : image finale
FROM node:20-alpine

WORKDIR /usr/src/app

# Copier uniquement les fichiers nécessaires depuis le builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/package.json ./

# Démarrer l'app
CMD ["node", "dist/main"]
