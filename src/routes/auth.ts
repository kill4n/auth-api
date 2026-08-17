import { Router, Request, Response } from "express";
import * as crypto from "crypto";
import jwt from "jsonwebtoken";
import { findByEmail, toPublicUser, User } from "../users";
import { verifyPassword } from "../password";
import { authenticate, AuthRequest, JWT_SECRET } from "../middleware/auth";

const router = Router();
const OTP = "123456";
const CHALLENGE_TTL_MS = 5 * 60 * 1000;

interface OtpChallenge {
  email: string;
  expiresAt: number;
}

const challenges = new Map<string, OtpChallenge>();

function createChallenge(email: string): string {
  const challengeId = crypto.randomUUID();
  challenges.set(challengeId, { email, expiresAt: Date.now() + CHALLENGE_TTL_MS });
  return challengeId;
}

function getValidChallenge(challengeId: string): OtpChallenge | undefined {
  const challenge = challenges.get(challengeId);
  if (!challenge) {
    return undefined;
  }

  if (challenge.expiresAt <= Date.now()) {
    challenges.delete(challengeId);
    return undefined;
  }

  return challenge;
}

function signToken(user: User): string {
  return jwt.sign({}, JWT_SECRET, {
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

  const challengeId = createChallenge(user.email);
  res.json({ requiresOtp: true, challengeId });
});

router.post("/otp/request", (req: Request, res: Response) => {
  res.status(410).json({ error: "Endpoint deshabilitado. Inicia sesión para generar un challenge OTP." });
});

router.post("/otp/verify", (req: Request, res: Response) => {
  const { challengeId, otp } = req.body ?? {};

  if (typeof challengeId !== "string" || typeof otp !== "string" || !challengeId || !otp) {
    res.status(400).json({ error: "challengeId y otp son requeridos" });
    return;
  }

  const challenge = getValidChallenge(challengeId);
  if (!challenge || otp !== OTP) {
    res.status(401).json({ error: "OTP inválido" });
    return;
  }

  const user = findByEmail(challenge.email);
  if (!user) {
    res.status(404).json({ error: "Usuario no encontrado" });
    return;
  }

  challenges.delete(challengeId);
  res.json({ token: signToken(user), user: toPublicUser(user) });
});

router.get("/me", authenticate, (req: AuthRequest, res: Response) => {
  res.json({ user: req.user });
});

export default router;
