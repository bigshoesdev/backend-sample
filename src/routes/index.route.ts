import { Router } from "express";
import { IRoute } from "@definitions/interfaces";
import IndexController from "@controllers/index.controller";

class IndexRoute implements IRoute {
  public path = "/";
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
  }
}

export default IndexRoute;
