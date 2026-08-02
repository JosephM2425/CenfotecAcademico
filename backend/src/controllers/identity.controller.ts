import type { RequestHandler } from "express";
import { clerkClient, getAuth } from "@clerk/express";

export const getMe: RequestHandler = async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "No autenticado" });
    return;
  }

  const user = await clerkClient.users.getUser(userId);
  res.json({
    id: user.id,
    email: user.primaryEmailAddress?.emailAddress ?? null,
    nombre: [user.firstName, user.lastName].filter(Boolean).join(" "),
  });
};
