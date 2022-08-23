FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN yarn
COPY . ./
RUN yarn run build
RUN yarn run build:server

EXPOSE 5000
CMD [ "node", "./dist/server/index.js" ]
