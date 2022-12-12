import { pubnubService, urlService } from "@services";
import { ValidationException } from "@utils/exceptions";
import { isValidURL } from "@utils/validations";
import { NextFunction, Request, Response } from "express";

class URLController {
  public getShortenedURL = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const url = req.body.url;

      if (!isValidURL(url)) {
        throw new ValidationException(["The URL provided is not a valid URL."]);
      }

      const shortenedURL = urlService.generateShortenedURL(url);

      console.info(shortenedURL);
      await pubnubService.sendShortenedURL(shortenedURL);

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };

  public getURLFromID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;

      if (!urlService.isIDExist(id)) {
        throw new ValidationException(["The ID provided is not a valid one."]);
      }

      res.status(200).json({ url: urlService.getURLFromID(id) });
    } catch (error) {
      next(error);
    }
  };
}

export default URLController;
