import Oauth from "./Oauth.js";

class Authentication {
  constructor(technique, service) {
    this.service = service;
    switch (technique.toLocaleLowerCase()) {
      case "oauth":
        this.authType = new Oauth(service);
        break;
      default:
        break;
    }
  }

  loginUrl() {
    return this.authType.getLoginRoute();
  }

  getAccessToken(code) {
    return this.authType.getToken(code);
  }
}

export default Authentication;
