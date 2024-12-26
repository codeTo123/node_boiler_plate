import * as bodyParser from "body-parser";
import * as path from "path";
import cookieParser from "cookie-parser";
import express from "express";
const cors = require("cors");

import Logger from "../core/Logger";
import { NotFoundError, ApiError, InternalError } from "../core/ApiError";
import { WebRoute } from "./webRoute";

function loadRoutesForModules(router: any, moduleNames: any) {
  moduleNames.forEach((moduleName: any) => {
    try {
      const moduleRoute = require(`../modules/${moduleName}/route`);
      const RouteConstructor = moduleRoute[`${moduleName}Route`];

      if (RouteConstructor) {
        new RouteConstructor(router);
      } else {
        console.error(`Route constructor not found for module ${moduleName}`);
      }
    } catch (err) {
      console.error(`Failed to load routes for module ${moduleName}: ${err}`);
    }
  });
}

/**
 * The server.
 *
 * @class Server
 */
export class Server {
  public app: express.Application;
  public router: express.Router;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    this.router = express.Router();
    //create express js application
    this.app = express();
    this.app.use(cors());

    //configure application
    this.config();

    // this.log_variable();
    //add routes For Web APP
    this.web();

    //add api For Rest API
    this.api();

    // Error handling
    this.ErrorHandling();
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api() {

    loadRoutesForModules(this.router, process.env.MODULES?.split(","));
    //use router middleware
    this.app.use(`/api/v1`, this.router);

  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {
    //add static paths
    this.app.use("/public", express.static("public"));

    //configure pug
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "ejs");

    //mount json form parser
    this.app.use(bodyParser.json({ limit: "50mb" }));

    //mount query string parser
    this.app.use(
      bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
      })
    );

    this.app.use(async function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, crossdomain, withcredentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin, TokenType"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );

      // Handle preflight requests
      if (req.method === "OPTIONS") {
        res.sendStatus(204); // No Content
      } else {
        next();
      }
    });

    //mount cookie parser middleware
    this.app.use(cookieParser("SECRET_GOES_HERE"));
  }

  public ErrorHandling() {
    //error handling
    this.app.use((req, res, next) => next(new NotFoundError()));

    // catch 404 and forward to error handler
    this.app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        if (err instanceof ApiError) {
          ApiError.handle(err, res);
        } else {
          if (process.env.NODE_ENV === "development") {
            Logger.error(err);
            return res.status(500).send(err.message);
          }
          console.log("err :: ", err);
          ApiError.handle(new InternalError(), res);
        }
      }
    );
  }

  /**
   * Create and return Router.
   *
   * @class Server
   * @method web
   * @return void
   */
  private web() {
    //IndexRoute
    WebRoute.create(this.router);
    this.app.use("/", this.router);
  }
}
