export class SystemError extends Error {
  private _code?: string;

  get code(): string | undefined {
    return this._code;
  }

  constructor(code: string, message?: string) {
    super(message); // 'Error' breaks prototype chain here
    this.name = 'SystemError';
    this._code = code;
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

export class ValidationError extends SystemError {
  public _required_variables: string[];

  constructor(values: string[], message?: string) {
    super('validation-error', message); // 'Error' breaks prototype chain here
    this.name = 'ValidationError';
    this._required_variables = values;
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}
export class NotFoundError extends SystemError {
  constructor(message?: string) {
    super('notFound-error', message); // 'Error' breaks prototype chain here
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}
export class UnAuthorizedError extends SystemError {
  constructor(message?: string) {
    super('unauthorized-error', message); // 'Error' breaks prototype chain here
    this.name = 'UnAuthorizedError';
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

export class ServerError extends SystemError {
  constructor(message?: string) {
    super('server-error', message); // 'Error' breaks prototype chain here
    this.name = 'ServerError';
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}
export class ConflictError extends SystemError {
  constructor(message?: string) {
    super('conflict-error', message); // 'Error' breaks prototype chain here
    this.name = 'ConflictError';
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

export class BadRequestError extends SystemError {
  constructor(message?: string) {
    super('bad-request-error', message); // 'Error' breaks prototype chain here
    this.name = 'BadRequestError';
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

export class UnprocessableError extends SystemError {
  constructor(message?: string) {
    super('unprocessable-error', message); // 'Error' breaks prototype chain here
    this.name = 'UnprocessableError';
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

export class GatewayError extends SystemError {
  constructor(message?: string) {
    super('gateway-error', message); // 'Error' breaks prototype chain here
    this.name = 'GatewayError';
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}
