import Google from "./Google.js";

export default class Oauth {
  constructor(service) {
    this.service = service;
    switch (this.service.toLocaleLowerCase()) {
      case "google":
        this.authType = new Google();
        break;
      default:
        break;
    }
  }

  getLoginRoute() {
    return this.authType.getAuthURL();
  }

  getToken(code) {
    return this.authType.getAccessToken(code);
  }
}
