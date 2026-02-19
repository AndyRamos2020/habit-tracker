# Habit Tracker - Semana 1

## Descripción
Aplicación backend para gestión de hábitos utilizando Express y MongoDB Atlas.

Permite:
- Crear hábitos
- Listar hábitos
- Actualizar hábitos
- Eliminar hábitos

## Tecnologías utilizadas
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Instalación

1. Clonar el repositorio
2. Ejecutar:
   npm install
3. Crear archivo .env en la raíz con:

   MONGO_URI=tu_cadena_de_conexion

4. Ejecutar el servidor:

   node src/app.js

Servidor disponible en:
http://localhost:3000

## Endpoints

POST   /api/habits  
GET    /api/habits  
PUT    /api/habits/:id  
DELETE /api/habits/:id
