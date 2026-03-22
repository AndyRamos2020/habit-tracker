# Habit Tracker App

Aplicación web para el seguimiento de hábitos basada en el concepto de racha diaria (0 a 66 días).

## Tecnologías

* Frontend: Next.js
* Backend: Express.js
* Base de datos: MongoDB
* Autenticación: JWT

## structura del proyecto

```
/frontend
/backend
README.md
```

## 🔥 Funcionalidades

* Registro e inicio de sesión
* Creación de hábitos
* Seguimiento de racha
* Barra de progreso dinámica
* Protección con JWT

## ⚙️ Cómo ejecutar

### Backend

```
cd backend
npm install
npm run dev
```

### Frontend

```
cd frontend
npm install
npm run dev
```

##  Variables de entorno (backend)

Crear archivo `.env`:

```
PORT=5000
MONGO_URI=tu_mongo_uri
JWT_SECRET=secreto
```

##  API

* POST /api/auth/register
* POST /api/auth/login
* GET /api/habits
* POST /api/habits
* PUT /api/habits/:id

##  Notas

* No subir `.env`
* Usar rama semana5
