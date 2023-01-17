import { Router } from "express";
import Authentication from "./Authentication.js";
import { cookieName } from "../../constant.js";
import { RedirectToLoginPage } from "../../config.js";

class Api extends Router {
  constructor() {
    super();

    this.get("/login/:Oauth/:type", (req, res, next) => {
      const { Oauth, type } = req.params;
      const authentication = new Authentication(Oauth, type);
      const redirectUrl = authentication.loginUrl();
      res.json({ redirectUrl });
      // res.redirect("http://www.google.com");
    });

    //
    this.get("/auth/:type", async (req, res, next) => {
      console.log(req.params);
      const authentication = new Authentication("Oauth", req.params.type);
      const token = await authentication.getAccessToken(req.query.code);
      res.cookie(cookieName, token.accessToken, {
        expires: new Date(Date.now() + 1800000),
        httpOnly: true,
        secure: true,
        // Domain: ".yourawesomeproject.com",
      });
      // !! redirected to protected route after login
      res.redirect(RedirectToLoginPage);
    });

    //
    this.get("/logout", async (req, res, next) => {
      res.clearCookie(cookieName);
      res.json({
        message: "Successfully Logged Out",
      });
    });

    this.get("/isLoggedIn", (req, res, next) => {
      res.json({
        isLoggedIn: true,
      });
    });

    //
    this.get("/test", async (req, res, next) => {
      console.log(req.headers);

      res.json(req.headers);
    });
  }
}

export default Api;
