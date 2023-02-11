export class CustomError extends Error {
  public code: string;
  public statusCode: number;

  constructor(code: string, statusCode: number, message: string) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
  }
}

export class InternalServerError extends CustomError {
  constructor() {
    super("0001", 500, "Internal server error");
  }
}

export class NotImplementedError extends CustomError {
  constructor() {
    super("0002", 501, "Not implemented");
  }
}

export class BadRequestError extends CustomError {
  constructor(message?: string) {
    super("0003", 400, message ?? "Bad Request");
  }
}

export class UnauthorizedError extends CustomError {
  constructor() {
    super("0004", 401, "Unauthorized");
  }
}

export class NotFoundError extends CustomError {
  constructor(message?: string) {
    super("0005", 400, message ?? "Not Found");
  }
}
