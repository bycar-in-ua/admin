import { API_URL } from "@/constants";
import { getCookie } from "@/helpers/cookieHelpers";
import { AuthService, LoginUserPayload } from "@bycar-in-ua/sdk";
import { ofetch } from "ofetch";

const authService = new AuthService(API_URL, ofetch);

const accessToken = getCookie("bycar-access-token"); // TODO: use variable from SDK
const refreshToken = getCookie("bycar-refresh-token"); // TODO: use variable from SDK

const login = async (payload: LoginUserPayload) => {
  const user = await authService.login(payload); // .login(): Promise<never> but I got User here
  return user;
};

const logout = async () => {
  await authService.logout(accessToken ?? "");
};

const getUser = async () => {
  return await authService.authenticate(accessToken ?? "");
};

const refresh = async () => {
  return await authService.authenticate(refreshToken ?? "");
};

export default {
  login,
  logout,
  getUser,
  refresh,
};
