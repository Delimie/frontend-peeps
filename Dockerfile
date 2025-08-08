# Stage 1: Build
FROM node:24.5-alpine AS builder
WORKDIR /app

# Install deps and build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the frontend port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]