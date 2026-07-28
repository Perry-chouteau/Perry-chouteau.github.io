# --- build : Node n'existe QUE ici. Il ne part pas en prod. ---
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- runtime : juste nginx et des fichiers statiques. ---
FROM nginxinc/nginx-unprivileged:1.29-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# nginx-unprivileged tourne deja en UID 101, non-root.
EXPOSE 8080

# Pas de HEALTHCHECK : podman l'ignore en format OCI, et Kubernetes ne le lit
# pas de toute facon. La sonde se declare cote manifeste, sur /healthz.
