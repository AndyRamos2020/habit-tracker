# Frontend - Habit Tracker

Aplicación web desarrollada con Next.js para la gestión de hábitos diarios.

## Tecnologías
- Next.js
- JavaScript
- Fetch API

## Funcionalidades
- Registro de usuarios
- Inicio de sesión
- Persistencia de sesión con token
- Creación de hábitos
- Visualización de hábitos
- Marcado de hábitos como completados
- Barra de progreso basada en racha de días
- Protección de rutas

## Instalación

1. Entrar a la carpeta frontend:
   cd frontend

2. Instalar dependencias:
   npm install

3. Ejecutar el proyecto:
   npm run dev

4. Abrir en navegador:
   http://localhost:3000

## Estructura

- app/ → páginas (login, dashboard)
- services/ → conexión con backend
- middleware.js → protección de rutas

## Notas

- El frontend consume la API del backend en:
  http://localhost:4000/api

- El token se guarda en localStorage y cookies para autenticación.
