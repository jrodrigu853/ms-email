FROM node:16

WORKDIR /app

COPY . ./app

RUN npm install

EXPOSE 7000

CMD [ "node", "index.js" ]