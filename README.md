# Express TypeScript Auth API

Development authentication API built with Express, TypeScript, and JWT. It provides a two-step login flow with a mock OTP challenge and demo users for local UI integration.

> The OTP flow is for development/demo use only. The fixed mock OTP (`123456`) and in-memory challenges are not production secure.

## Requirements

- Node.js 22+
- npm

## Installation

```bash
npm install
```

## Environment

Create a local environment file from the example:

```bash
cp .env.example .env
```

```env
PORT=3000
JWT_SECRET=your-secret
JWT_EXPIRES_IN=1h
```

| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | HTTP server port | `3000` |
| `JWT_SECRET` | Secret used to sign JWTs | `dev-secret` |
| `JWT_EXPIRES_IN` | JWT expiration | `1h` |

## Run

Development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Start compiled app:

```bash
npm start
```

Docker development image:

```bash
docker build -f Dockerfile.dev -t auth-api-dev .
docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app auth-api-dev
```

## CORS

CORS is configured to allow requests from:

```text
http://localhost:5173
```

## Demo Users

| Role | Email | Password | CanViewWorkspaces | CanViewFiles | CanViewDataGovernance | CanViewTools |
| --- | --- | --- | --- | --- | --- | --- |
| Admin | `demo@demo.com` | `demo123` | Yes | Yes | Yes | Yes |
| Owner | `owner@demo.com` | `owner123` | Yes | Yes | Yes | Yes |
| Editor | `editor@demo.com` | `editor123` | Yes | Yes | No | No |
| Viewer | `viewer@demo.com` | `viewer123` | Yes | No | No | No |
| Project Manager | `pm@demo.com` | `pm123` | No | No | No | No |

## Endpoints

### `GET /health`

Returns service health.

```json
{ "status": "ok" }
```

### `POST /api/v1/auth/login`

Validates email and password, then creates an OTP challenge. It does not return a token or user.

Request:

```json
{
  "email": "demo@demo.com",
  "password": "demo123"
}
```

Response:

```json
{
  "requiresOtp": true,
  "challengeId": "<challenge-id>"
}
```

### `POST /api/v1/auth/otp/verify`

Verifies the challenge with the mock OTP `123456` and returns the JWT token and current user.

Request:

```json
{
  "challengeId": "<challenge-id>",
  "otp": "123456"
}
```

Response:

```json
{
  "token": "<jwt>",
  "user": {
    "id": "1",
    "email": "demo@demo.com",
    "name": "Demo User",
    "role": "admin",
    "permissions": {
      "CanViewWorkspaces": true,
      "CanViewFiles": true,
      "CanViewDataGovernance": true,
      "CanViewTools": true
    }
  }
}
```

### `POST /api/v1/auth/otp/request`

Disabled. Returns HTTP `410 Gone`.

### `GET /api/v1/auth/me`

Requires a Bearer token and returns the current user.

Header:

```text
Authorization: Bearer <token>
```

Response:

```json
{
  "user": {
    "id": "1",
    "email": "demo@demo.com",
    "name": "Demo User",
    "role": "admin",
    "permissions": {
      "CanViewWorkspaces": true,
      "CanViewFiles": true,
      "CanViewDataGovernance": true,
      "CanViewTools": true
    }
  }
}
```

## License

[MIT](LICENSE)
