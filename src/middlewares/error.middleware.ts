import { NextFunction, Request, Response } from "express";
import { HttpException, ValidationException } from "@utils/exceptions";
import { Logger } from "@utils/logger";

const errorMiddleware = (
  error: HttpException | ValidationException | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = "status" in error ? error.status : 500;
    const message: string = error.message || "Something went wrong";
    const errors: string[] = "errors" in error ? error.errors : [message];
    const errorCode: string | undefined =
      "code" in error ? error.code : undefined;

    if (
      !(error instanceof HttpException || error instanceof ValidationException)
    ) {
      Logger.error(error);
    }

    errors.length > 1
      ? res.status(status).json({ message, errors, errorCode })
      : res.status(status).json({ message, errorCode });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
