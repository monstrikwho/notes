FROM node:18

WORKDIR /app

COPY package*.json ./

ENV TZ=Europe/Moscow

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]