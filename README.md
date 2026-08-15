# Auth API

Authentication backend built with Express, TypeScript, and JWT.

## Requirements

- Node.js 22+
- npm

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```
PORT=3000
JWT_SECRET=your-secret
JWT_EXPIRES_IN=1h
```

| Variable         | Description                     | Default      |
| ---------------- | ------------------------------- | ------------ |
| `PORT`           | Server port                     | `3000`       |
| `JWT_SECRET`     | Secret used to sign tokens      | `dev-secret` |
| `JWT_EXPIRES_IN` | Token expiration                | `1h`         |

## Usage

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

### Docker (development)

```bash
docker build -f Dockerfile.dev -t auth-api-dev .
docker run -p 3000:3000 -v $(pwd):/app auth-api-dev
```

## Demo User

| Field    | Value          |
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

Response:

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

### Get current user

`GET /api/v1/auth/me`

Header:

```
Authorization: Bearer <token>
```

## Structure

```
src/
├── index.ts          # Server entry point
├── middleware/
│   └── auth.ts       # JWT authentication middleware
├── routes/
│   └── auth.ts       # Authentication routes
├── users.ts          # Users and permissions
└── password.ts       # Password hashing and verification
```
