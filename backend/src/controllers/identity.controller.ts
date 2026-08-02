import type { RequestHandler } from "express";
import { getAuth } from "@clerk/express";
import { resolveCurrentUser } from "../services/identity.service.js";

export const getMe: RequestHandler = async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "No autenticado" });
    return;
  }

  const { user } = await resolveCurrentUser(userId);
  const { password: _password, ...profile } = user;
  res.json(profile);
};
