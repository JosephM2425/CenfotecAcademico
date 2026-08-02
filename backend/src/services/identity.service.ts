import { randomUUID } from "node:crypto";
import { clerkClient } from "@clerk/express";
import { userService } from "./user.service.js";
import { Role, UserStatus } from "../models/enums.js";
import { HttpError } from "../utils/httpError.js";

export async function resolveCurrentUser(clerkUserId: string) {
  const clerkUser = await clerkClient.users.getUser(clerkUserId);
  const email = clerkUser.primaryEmailAddress?.emailAddress;
  if (!email) {
    throw new HttpError(401, "El usuario de Clerk no tiene un correo asociado");
  }

  let user = await userService.getByEmail(email);
  if (!user) {
    const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || email;
    try {
      user = await userService.create({
        name,
        email,
        password: randomUUID(),
        role: Role.Student,
        status: UserStatus.Active,
      });
    } catch {
      user = await userService.getByEmail(email);
      if (!user) throw new HttpError(500, `No se pudo registrar el usuario ${email}`);
    }
  }

  return { clerkUser, user };
}
