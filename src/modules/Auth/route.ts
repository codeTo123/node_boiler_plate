import { Router } from "express";
import { AuthController } from "./controller";

export class AuthRoute {
  router: Router;
  controller: AuthController;
  constructor(router: Router) {
    this.router = router;
    this.controller = new AuthController();
    this.route();
  }
  private route() {
    this.router.post("/Auth/forgot-password", this.controller.forgotPassword);
    this.router.put("/Auth/change-password", this.controller.changePassword);
    this.router.put("/Auth/reset-password", this.controller.resetPassword);
    this.router.post("/Auth/login", this.controller.login);
    this.router.get("/Auth/refresh-token", this.controller.refreshAccessToken);
  }
}
