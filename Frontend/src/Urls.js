import config from "./config";
const server = config.devBackendServer;
const urls = {
  getLoginUrl: `${server}/authentication/api/login/oauth/google`,
  isLoggedIn: `${server}/authentication/api/isloggedin`,
  logout: `${server}/authentication/api/logout`,
};

export default urls;
