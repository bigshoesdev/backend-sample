import express from "express";
import bodyParser from "body-parser";
import config from "@config";
import { IRoute } from "@definitions/interfaces/IRoute";
import { Logger } from "@utils/logger";
import { errorMiddleware } from "@middlewares";

class App {
  app: express.Application;

  constructor(routes: IRoute[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(
      bodyParser.json({
        limit: "200kb",
      })
    );
  }

  private initializeRoutes(routes: IRoute[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  listen() {
    this.app.listen(config.port, () =>
      Logger.info(`🚀 Server started at http://${config.host}:${config.port}`)
    );
  }

  get server() {
    return this.app;
  }
}

export default App;
