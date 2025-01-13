## Instalación DEV environment

1. Clonar el repo.
2. Instalar las dependencias `npm install`.
3. Tener instalado docker y levantar la base de datos con el comando `docker compose up -d`.
4. Correr migraciones de Sequelize `npx sequelize-cli db:migrate`
5. Ejecutar seed para tener registros en la base de datos`npx sequelize-cli db:seed:all`
6. Correr el proyecto `nodemon index.js `.

## Endepoints

Se adjunta coleccion de postman donde se encuentrar todos los endpoints.
