FROM node:14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./back/package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]