import Cookies from "js-cookie";

class AuthManager {
  static isAuthenticated() {
    const is_logged_in = Cookies.get("is_logged_in");
    return is_logged_in && is_logged_in !== "" || false;
  }
}

export default AuthManager;