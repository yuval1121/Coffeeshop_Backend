FROM mhart/alpine-node:16

WORKDIR /server

COPY package.json ./

RUN npm install

COPY . .

CMD [ "npm","start" ]