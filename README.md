# Auth API

Backend de autenticación construido con Express, TypeScript y JWT.

## Requisitos

- Node.js 22+
- npm

## Instalación

```bash
npm install
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```
PORT=3000
JWT_SECRET=tu-secreto
JWT_EXPIRES_IN=1h
```

| Variable         | Descripción                     | Default      |
| ---------------- | ------------------------------- | ------------ |
| `PORT`           | Puerto del servidor             | `3000`       |
| `JWT_SECRET`     | Secreto para firmar los tokens  | `dev-secret` |
| `JWT_EXPIRES_IN` | Expiración de los tokens        | `1h`         |

## Uso

### Desarrollo

```bash
npm run dev
```

### Compilar

```bash
npm run build
```

### Producción

```bash
npm start
```

### Docker (desarrollo)

```bash
docker build -f Dockerfile.dev -t auth-api-dev .
docker run -p 3000:3000 -v $(pwd):/app auth-api-dev
```

## Usuario demo

| Campo    | Valor          |
| -------- | -------------- |
| Email    | `demo@demo.com` |
| Password | `demo123`      |

## Endpoints

### Health check

`GET /health`

### Login

`POST /api/v1/auth/login`

Body:

```json
{
  "email": "demo@demo.com",
  "password": "demo123"
}
```

Respuesta:

```json
{
  "token": "eyJ...",
  "user": {
    "id": "1",
    "email": "demo@demo.com",
    "name": "Demo User",
    "role": "admin",
    "permissions": {}
  }
}
```

### Obtener usuario actual

`GET /api/v1/auth/me`

Header:

```
Authorization: Bearer <token>
```

## Estructura

```
src/
├── index.ts          # Punto de entrada del servidor
├── middleware/
│   └── auth.ts       # Middleware de autenticación JWT
├── routes/
│   └── auth.ts       # Rutas de autenticación
├── users.ts          # Usuarios y permisos
└── password.ts       # Hash y verificación de contraseñas
```
