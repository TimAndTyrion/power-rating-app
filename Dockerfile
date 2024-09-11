# Use an official Node.js runtime as the base image
FROM node:alpine as build 
# Set the working directory in the container
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/dist .

EXPOSE 6060
ENTRYPOINT ["nginx", "-g", "daemon off;"]