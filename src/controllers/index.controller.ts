import { Request, Response } from "express";

class IndexController {
  public index = (req: Request, res: Response) => res.json({ status: "OK" });
}

export default IndexController;
