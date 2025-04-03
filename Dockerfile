# Stage 1: Build the React app
FROM node:22 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy built files from React build stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx config 
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]