import {
  SERVER_ROOT_URI,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "../../config.js";
import axios from "axios";
import JWT from "./Jwt.js";

import { redirectURI, rootUrl } from "../../constant.js";
import querystring from "querystring";

export default class Google {
  constructor() {}
  getAuthURL() {
    const options = {
      redirect_uri: `${SERVER_ROOT_URI}/${redirectURI}`,
      client_id: GOOGLE_CLIENT_ID,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };

    return `${rootUrl}?${querystring.stringify(options)}`;
  }

  async getTokens({ code, clientId, clientSecret, redirectUri }) {
    /*
     * Uses the code to get tokens
     * that can be used to fetch the user's profile
     */
    const url = "https://oauth2.googleapis.com/token";
    const values = {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    };

    const res = await axios.post(url, querystring.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  }

  async getAccessToken(code) {
    const { id_token, access_token } = await this.getTokens({
      code,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      redirectUri: `${SERVER_ROOT_URI}/${redirectURI}`,
    });

    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    console.log(googleUser);
    const jwtObj = new JWT();
    const token = jwtObj.getTokens(googleUser.data);
    return token;
  }
}
