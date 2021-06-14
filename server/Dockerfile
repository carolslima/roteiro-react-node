FROM node:12.22.1-alpine3.12

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD [ "npm","run","dev" ]
