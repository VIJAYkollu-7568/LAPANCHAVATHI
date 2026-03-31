const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "lapanchavati2024";

export const validateAdmin = (username: string, password: string): boolean => {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
};

export const isAdminLoggedIn = (): boolean => {
  return sessionStorage.getItem("admin_logged_in") === "true";
};

export const loginAdmin = () => {
  sessionStorage.setItem("admin_logged_in", "true");
};

export const logoutAdmin = () => {
  sessionStorage.removeItem("admin_logged_in");
};
