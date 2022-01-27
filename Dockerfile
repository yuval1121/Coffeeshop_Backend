FROM node:lts-alpine

WORKDIR /server

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . .
RUN npx tsc

CMD ["node","dist/server.js"]