# Hackaton2023

[Описание проекта](./report.md)

## Развертывание проекта

### Необходимые инструменты

- Node JS v 16.16
- Docker
- Docker Compose

### Установка зависимостей

- В каждой папке с микросервисом необходимо выполнить команду `npm install`
- В случае ошибок с `npm i` использовать `npm i --force`

### Запуск проекта

- В корневой директории проекта выполнить команду `docker-compose up -d`
- После запуска всех контейнеров необходимо запустить все микросервисы, для этого на локальной машине, в директории каждого сервиса
  выполнить команду `npm run start`
- Api Gateway будет доступен по адресу `http://localhost:3000/api/v1`
