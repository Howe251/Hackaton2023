# Hackaton2023

## Развертывание проекта

### Необходимые инструменты
- Node JS v 16.16
- Docker
- Docker Compose

### Установка зависимостей
- В каждом микросервисе необходимо выполнить команду `npm install`

### Запуск проекта
- В корневой директории проекта выполнить команду `docker-compose up -d`
- После запуска всех контейнеров необходимо запустить все сервисы, для этого в директории каждого сервиса
выполнить команду `npm run start`
- Api Gateway доступен по адресу `http://localhost:3000`

## Эндпоинты
- ```
POST /auth/login

BODY 
{
    "email": "cyber@sec.com"
    "password": "12345678"
}

RESPONSE
{
"success": true,
"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImN5YmVyQHNlYy5jb20iLCJpZCI6MSwibmFtZSI6IkFub255bW91cyIsImlhdCI6MTcwMDkzMDM2NCwiZXhwIjoxNzAwOTMzOTY0fQ.BaA1YIJacAsYpzDm1BezH3T1P_Ptz0LlfMUslOUgGaY"
}
```
