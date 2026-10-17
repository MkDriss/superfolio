# syntax=docker/dockerfile:1

# ---------- Stage 1: build the Angular app ----------
FROM node:22-alpine AS build

WORKDIR /app

# active pnpm via corepack (déjà fourni par l'image node)
RUN corepack enable

# copie d'abord les fichiers de dépendances : si seul le code change,
# Docker réutilise ce layer et ne refait pas l'installation à chaque build
COPY superfolio-frontend/package.json superfolio-frontend/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# copie le reste du projet et build en production
COPY superfolio-frontend/ ./
RUN npm run build -- --configuration production

# ---------- Stage 2: serve the static files with nginx ----------
FROM nginx:1.27-alpine AS serve

# Angular (build system moderne) sort les fichiers dans dist/<nom-du-projet>/browser.
# Ce project name vient de angular.json ; adapte-le s'il diffère de "superfolio-frontend".
COPY --from=build /app/dist/superfolio-frontend/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 9652

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
    CMD wget -qO- http://localhost/ > /dev/null || exit 1