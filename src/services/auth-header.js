export function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.jwt_token) {
    return { Authorization: user.jwt_token };
  } else {
    return {};
  }
}
export function authRole() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "ADMIN") {
    return { Authorization: user.jwt_token };
  } else if (user && user.role === "TEACHER") {
    return { Authorization: user.jwt_token };
  } else if (user && user.role === "STUDENT") {
    return { Authorization: user.jwt_token };
  } else {
    return {};
  }
}
