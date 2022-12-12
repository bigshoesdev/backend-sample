import BaseRoute from "@routes/base.route";
import URLController from "@controllers/url.controller";

class URLRoute extends BaseRoute {
  public path = "";
  public controller = new URLController();

  constructor() {
    super();

    this.routes = [
      {
        method: "post",
        route: "/url",
        controller: this.controller.getShortenedURL,
        middlewares: [],
      },
      {
        method: "get",
        route: "/:id",
        controller: this.controller.getURLFromID,
        middlewares: [],
      },
    ];

    this.initializeRoutes();
  }
}

export default URLRoute;
