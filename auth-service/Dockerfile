FROM node:alpine

WORKDIR /usr/src/app/auth-service

COPY package*.json ./

COPY . .

RUN npm install

CMD ["npm", "run", "start:prod"]