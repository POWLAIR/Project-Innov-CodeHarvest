# Étape 1 : Builder
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copier les fichiers package.json + lock
COPY package*.json ./

# Copier tout le code backend
COPY . .

# Installer les dépendances
RUN npm install

# Copier le fichier schema.prisma
COPY ../../prisma ../../prisma

# Générer le client Prisma
RUN npx prisma generate

# Compiler le code NestJS
RUN npm run build

# Étape 2 : Image finale
FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

# Déployer les migrations puis lancer l'app
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
