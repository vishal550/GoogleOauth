import jwt from "jsonwebtoken";
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from "../../config.js";
export default class JWT {
  constructor() {
    // !! Need to add in some database
    this.validRefreshTokens = [];
  }

  async getTokens(user) {
    const accessToken = await jwt.sign(user, JWT_ACCESS_TOKEN, {
      expiresIn: "30m",
    });
    const refreshToken = await jwt.sign(user, JWT_REFRESH_TOKEN);
    // validRefreshTokens.push(refreshToken);
    return { accessToken, refreshToken };
  }

  async validateToken(req, token) {
    const user = jwt.verify(token, JWT_ACCESS_TOKEN);
    req.user = user;
  }
}
