import type { RequestHandler } from "express";
import { clerkClient, getAuth } from "@clerk/express";
import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { users } from "../models/index.js";
import type { Role } from "../models/enums.js";

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: number;
  status: number;
  registeredAt: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: CurrentUser;
    }
  }
}

export const requireAuth: RequestHandler = (req, res, next) => {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "No autenticado" });
    return;
  }
  next();
};

export const loadCurrentUser: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      res.status(401).json({ error: "No autenticado" });
      return;
    }

    const clerkUser = await clerkClient.users.getUser(userId);
    const email = clerkUser.primaryEmailAddress?.emailAddress;
    if (!email) {
      res
        .status(401)
        .json({ error: "El usuario de Clerk no tiene un correo asociado" });
      return;
    }

    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) {
      res
        .status(403)
        .json({ error: "No existe un perfil registrado para este correo" });
      return;
    }

    req.currentUser = user;
    next();
  } catch (err) {
    next(err);
  }
};

export function requireRole(...roles: Role[]): RequestHandler {
  return (req, res, next) => {
    if (!req.currentUser || !roles.includes(req.currentUser.role as Role)) {
      res.status(403).json({ error: "No tiene permisos para esta acción" });
      return;
    }
    next();
  };
}
