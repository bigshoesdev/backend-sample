import { NextFunction, Response, Request, Router } from "express";
import { IRoute } from "@definitions/interfaces";

type RouteFunc = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void>;

class BaseRoute implements IRoute {
  public path = "";
  public router = Router();

  protected routes = Array<{
    method: string;
    route: string;
    controller: RouteFunc;
    middlewares: Array<RouteFunc>;
  }>();

  protected initializeRoutes() {
    this.routes.forEach((route) => {
      // eslint-disable-next-line
      (this.router as any)[route.method](
        `${this.path}${route.route}`,
        route.middlewares,
        route.controller
      );
    });
  }
}

export default BaseRoute;
