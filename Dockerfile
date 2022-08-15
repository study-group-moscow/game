#На каком образе работает приложение
FROM node:14.16.0-slim

#Рабочая папка
WORKDIR /app

#Копируем package.json, package-lock.json
COPY package*.json ./

#Установка зависимостей
RUN npm install

#Копируем все файлы
COPY . .
