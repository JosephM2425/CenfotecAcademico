import type { RequestHandler } from "express";
import { getAuth } from "@clerk/express";
import { resolveCurrentUser } from "../services/identity.service.js";
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

    const { user } = await resolveCurrentUser(userId);
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
