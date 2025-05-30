# Stage 1: Build
FROM node:22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Development
FROM node:22 AS dev
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 4200
CMD ["npm", "run", "start"]

# Stage 3: Production
FROM caddy:2-alpine AS prod
COPY --from=builder /app/dist/pktouradmin-ui/browser /usr/share/caddy/
COPY Caddyfile /etc/caddy/Caddyfile
