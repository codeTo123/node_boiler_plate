import { NextFunction, Request, Response, Router } from "express";
const fs = require("fs");

export class WebRoute {
  public static create(router: Router) {
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      new WebRoute().index(req, res, next);
    });
  }

  public index(req: Request, res: Response, next: NextFunction) {
    //render template
    res.locals.BASE_URL = "/";

    //add title
    res.locals.title = "Node Rest Apis";

    const htmlTemplatePath = "index.html";
    const htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf8");
    res.send(htmlTemplate);
  }
}
