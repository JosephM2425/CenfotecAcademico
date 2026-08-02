import type { RequestHandler } from "express";
import { userService } from "../services/user.service.js";
import { BadRequestError } from "../utils/httpError.js";

export const listUsers: RequestHandler = async (_req, res) => {
  res.json(await userService.list());
};

export const getUser: RequestHandler = async (req, res) => {
  res.json(await userService.getById(Number(req.params.id)));
};

export const createUser: RequestHandler = async (req, res) => {
  const { name, email, password, role, status } = req.body ?? {};
  if (!name || !email || !password || !role || !status) {
    throw new BadRequestError("name, email, password, role y status son requeridos");
  }
  res.status(201).json(await userService.create({ name, email, password, role, status }));
};

export const updateUser: RequestHandler = async (req, res) => {
  res.json(await userService.update(Number(req.params.id), req.body ?? {}));
};

export const deleteUser: RequestHandler = async (req, res) => {
  await userService.remove(Number(req.params.id));
  res.status(204).send();
};
