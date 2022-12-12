import HttpException from "./HttpException";

class ValidationException extends HttpException {
  constructor(errors: string[] = []) {
    super(400, errors);
  }
}

export default ValidationException;
