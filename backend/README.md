# Backend - Habit Tracker

API desarrollada con Express.js y MongoDB para la gestión de hábitos.

## Tecnologías
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)

## Funcionalidades
- Registro de usuarios
- Inicio de sesión con JWT
- Middleware de autenticación
- Creación de hábitos
- Obtención de hábitos por usuario
- Sistema de racha de días
- Validación para evitar múltiples registros en el mismo día

## Instalación

1. Entrar a la carpeta backend:
   cd backend

2. Instalar dependencias:
   npm install

3. Crear archivo .env con:

   MONGO_URI=tu_url_de_mongodb
   JWT_SECRET=tu_clave_secreta

4. Ejecutar servidor:
   node index.js

Servidor corre en:
http://localhost:4000

## Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Habits
- GET /api/habits
- POST /api/habits
- PUT /api/habits/:id

## Notas

- Todas las rutas de hábitos requieren token JWT.
- El token se envía en el header Authorization.
