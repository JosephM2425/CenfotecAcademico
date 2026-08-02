import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { users } from "../models/index.js";
import { NotFoundError } from "../utils/httpError.js";
import type { Role, UserStatus } from "../models/enums.js";

export interface UserInput {
  name: string;
  email: string;
  password: string;
  role: Role;
  status: UserStatus;
}

export const userService = {
  async list() {
    return db.select().from(users);
  },

  async getById(id: number) {
    const [row] = await db.select().from(users).where(eq(users.id, id));
    if (!row) throw new NotFoundError(`Usuario con id ${id} no encontrado`);
    return row;
  },

  async getByEmail(email: string) {
    const [row] = await db.select().from(users).where(eq(users.email, email));
    return row ?? null;
  },

  async create(input: UserInput) {
    const [row] = await db.insert(users).output().values(input);
    return row;
  },

  async update(id: number, input: Partial<UserInput>) {
    const [row] = await db.update(users).set(input).output().where(eq(users.id, id));
    if (!row) throw new NotFoundError(`Usuario con id ${id} no encontrado`);
    return row;
  },

  async remove(id: number) {
    const [row] = await db.delete(users).output().where(eq(users.id, id));
    if (!row) throw new NotFoundError(`Usuario con id ${id} no encontrado`);
  },
};
