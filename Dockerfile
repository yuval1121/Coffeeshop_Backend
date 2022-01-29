FROM node:16-alpine

WORKDIR /server

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . .
RUN npx tsc
CMD ["node","dist/src/server.js"]