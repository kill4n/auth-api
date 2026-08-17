import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { findById, PublicUser } from "../users";

export const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export interface AuthRequest extends Request {
  user?: PublicUser;
}

interface AuthTokenPayload extends jwt.JwtPayload {
  sub: string;
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Token requerido" });
    return;
  }

  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
    const user = findById(payload.sub);
    if (!user) {
      res.status(401).json({ error: "Usuario no encontrado" });
      return;
    }
    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: user.permissions,
    };
    next();
  } catch {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
}
