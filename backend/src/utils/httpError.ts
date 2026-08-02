export class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends HttpError {
  constructor(message = "Solicitud inválida") {
    super(400, message);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = "No tiene permisos para esta acción") {
    super(403, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Recurso no encontrado") {
    super(404, message);
  }
}
