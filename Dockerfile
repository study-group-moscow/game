# На каком образе работает приложение
# FROM node:14.16.0-slim

#Рабочая папка
# WORKDIR /app

#Копируем package.json, package-lock.json
# COPY package*.json ./

#Установка зависимостей
# RUN npm install

#Копируем все файлы
# COPY . .
# CMD ["npm", "run", "build"]
#Копируем папку dist
# COPY ./dist ./dist

# CMD ["npm", "run", "dev"]
# CMD ["npm", "run", "start"]

FROM node:16 as build-stage

WORKDIR /app

# 1 - соберем папку public со статикой
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn run build

# 2 - запустим сервер
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/public /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 5000
CMD ["nginx", "-g", "daemon off;"]
