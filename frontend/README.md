# Frontend - Habit Tracker

Aplicación cliente desarrollada con Next.js.

## Funcionalidades

* Registro de usuario
* Login
* Dashboard
* Crear hábitos
* Completar hábitos
* Barra de progreso (0 a 66 días)

## ▶ Ejecución

```
npm install
npm run dev
```

## 🌐 Rutas

* /register
* /login
* /dashboard

## Cómo funciona

1. El usuario se registra o inicia sesión
2. El backend devuelve un token JWT
3. El token se guarda en localStorage
4. Cada petición envía el token en headers
5. El backend valida y responde con datos

## Notas

* Backend debe correr en http://localhost:5000
