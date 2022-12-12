class HttpException extends Error {
  status: number;
  errors: string[] = [];
  code?: string | undefined;

  constructor(status: number, errors: string[], code?: string | undefined) {
    super();
    this.status = status;
    this.errors = errors;
    this.message = errors.join(",");
    this.code = code;
  }
}

export default HttpException;
