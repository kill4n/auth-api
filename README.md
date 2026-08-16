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

Copy the template to create your local `.env` file:

```bash
cp .env.example .env
```

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
docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app auth-api-dev
```

## Demo Users

| Field | Value |
| ----- | ----- |
| Admin | `demo@demo.com` / `demo123` |
| Owner | `owner@demo.com` / `owner123` |
| Editor | `editor@demo.com` / `editor123` |
| Viewer | `viewer@demo.com` / `viewer123` |
| Project Manager | `pm@demo.com` / `pm123` |

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
    "permissions": {
      "CanCreateWorkspace": true,
      "CanViewWorkspace": true,
      "CanEditWorkspace": true,
      "CanDeleteWorkspace": true,
      "CanCreateProjects": true,
      "CanViewProjects": true,
      "CanEditProjects": true,
      "CanDeleteProjects": true,
      "CanManageUsers": true
    }
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

## License

[MIT](LICENSE)
