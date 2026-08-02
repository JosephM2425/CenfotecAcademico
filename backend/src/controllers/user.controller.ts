import type { RequestHandler } from "express";
import { userService } from "../services/user.service.js";
import { BadRequestError } from "../utils/httpError.js";

function omitPassword<T extends { password: string }>(user: T) {
  const { password: _password, ...rest } = user;
  return rest;
}

export const listUsers: RequestHandler = async (_req, res) => {
  const rows = await userService.list();
  res.json(rows.map(omitPassword));
};

export const getUser: RequestHandler = async (req, res) => {
  const user = await userService.getById(Number(req.params.id));
  res.json(omitPassword(user));
};

export const createUser: RequestHandler = async (req, res) => {
  const { name, email, password, role, status } = req.body ?? {};
  if (!name || !email || !password || !role || !status) {
    throw new BadRequestError("name, email, password, role y status son requeridos");
  }
  const user = await userService.create({ name, email, password, role, status });
  res.status(201).json(omitPassword(user));
};

export const updateUser: RequestHandler = async (req, res) => {
  const user = await userService.update(Number(req.params.id), req.body ?? {});
  res.json(omitPassword(user));
};

export const deleteUser: RequestHandler = async (req, res) => {
  await userService.remove(Number(req.params.id));
  res.status(204).send();
};
