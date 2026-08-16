import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { findByEmail, toPublicUser, User } from "../users";
import { verifyPassword } from "../password";
import { authenticate, AuthRequest, JWT_SECRET } from "../middleware/auth";

const router = Router();

function signToken(user: User): string {
  return jwt.sign({ email: user.email, role: user.role, permissions: user.permissions }, JWT_SECRET, {
    subject: user.id,
    expiresIn: (process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"]) || "1h",
  });
}

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body ?? {};
  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    res.status(400).json({ error: "email y password son requeridos" });
    return;
  }

  const user = findByEmail(email);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    res.status(401).json({ error: "Credenciales inválidas" });
    return;
  }

  res.json({ token: signToken(user), user: toPublicUser(user) });
});

router.get("/me", authenticate, (req: AuthRequest, res: Response) => {
  res.json({ user: req.user });
});

export default router;
