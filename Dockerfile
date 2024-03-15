# create build
FROM node:18-alpine AS builder

WORKDIR /
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

# create nginx server
FROM nginx:1.21-alpine

WORKDIR /usr/share/nginx/html
COPY --from=builder /dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

