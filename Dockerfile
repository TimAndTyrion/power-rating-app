# Use an official Node.js runtime as the base image
FROM node:alpine as build 
# Set the working directory in the container
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

EXPOSE 5173

ENTRYPOINT ["npm", "run", "dev"]