import decode from "jwt-decode";

class Auth {
  getToken() {
    return localStorage.getItem("id_token");
  }
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }
  logout() {
    localStorage.removeItem("id_token");
    window.location.reload();
  }
}
