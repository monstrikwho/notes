FROM node:18

WORKDIR /app

COPY package*.json ./

ENV TZ=Europe/Moscow

RUN npm install

COPY . .

EXPOSE 5000
EXPOSE 5010

CMD ["npm", "run", "start"]