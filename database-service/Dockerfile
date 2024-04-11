FROM node:alpine

WORKDIR /sistema-comandas/database-service

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]