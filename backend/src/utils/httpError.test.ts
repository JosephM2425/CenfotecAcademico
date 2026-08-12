import { describe, expect, it } from "vitest";
import { BadRequestError, ForbiddenError, HttpError, NotFoundError } from "./httpError.js";

describe("HttpError", () => {
  it("sets the status code and message", () => {
    const err = new HttpError(418, "Soy una tetera");
    expect(err.statusCode).toBe(418);
    expect(err.message).toBe("Soy una tetera");
    expect(err).toBeInstanceOf(Error);
  });
});

describe("BadRequestError", () => {
  it("defaults to 400 with a Spanish message", () => {
    const err = new BadRequestError();
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe("Solicitud inválida");
  });
});

describe("ForbiddenError", () => {
  it("defaults to 403 with a Spanish message", () => {
    const err = new ForbiddenError();
    expect(err.statusCode).toBe(403);
    expect(err.message).toBe("No tiene permisos para esta acción");
  });
});

describe("NotFoundError", () => {
  it("defaults to 404 with a Spanish message", () => {
    const err = new NotFoundError();
    expect(err.statusCode).toBe(404);
    expect(err.message).toBe("Recurso no encontrado");
  });
});
