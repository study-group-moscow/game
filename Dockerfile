#На каком образе работает приложение
FROM node:14.16.0-slim

#Рабочая папка
WORKDIR /app

#Копируем все файлы
COPY . /app

#Установка зависимостей
RUN npm install

CMD ["npm", "run", "build"]
#Копируем папку dist
COPY ./dist ./dist

CMD ["npm", "run", "dev"]
CMD ["npm", "run", "start"]
