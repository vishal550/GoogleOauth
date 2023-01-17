import express from "express";
import cookieParser from "cookie-parser";
import { PORT, allowedUrls, cookieName } from "./constant.js";
import { RedirectToLoginPage } from "./config.js";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import JWT from "./lib/Authentication/Jwt.js";
const app = new express();

app.use(
  cors({
    origin: true, // (Whatever your frontend url is)
    credentials: true, // <= Accept credentials (cookies) sent by the client
  })
);
app.use(cookieParser());

app.use((req, res, next) => {
  if (!req.headers.cookie && allowedUrls.some((o) => req.url.includes(o))) {
    next();
  } else if (!req.headers.cookie) {
    console.log(req.url);
    res.json({ m: "please login" });
  } else {
    console.log(req.url);
    try {
      new JWT().validateToken(
        req,
        req.headers.cookie.split(`${cookieName}=`)[1]
      );
      next();
    } catch (err) {
      res.status(400).json({
        message: "Validation Failed",
      });
    }
  }
});

async function registerRoute() {
  for (let fileName of fs.readdirSync(
    `${path.dirname(fileURLToPath(import.meta.url))}/lib`
  )) {
    try {
      console.log(
        `Registering ROUTE /${fileName.toLocaleLowerCase()} using ./routes/Api`
      );
      const { default: Api } = await import(`./lib/${fileName}/Api.js`);
      // http://localhost:4000/authentication/api/loginType/oauth/google
      console.log(`/${fileName.toLocaleLowerCase()}/api`);
      app.use(`/${fileName.toLocaleLowerCase()}/api`, new Api());
    } catch (e) {
      // Ensure all routes works
      console.error(e);
      throw e;
    }
  }
}

registerRoute();

app.use((err, req, res, next) => {
  console.log("error", err);
});

app.listen(4000, () => {
  console.log(`App is listening on port ${PORT}`);
});
