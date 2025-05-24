import { defineStore } from "pinia";
import { ofetch } from "ofetch";
import {
  type ReducedUser,
  type LoginUserPayload,
  AuthService,
} from "@bycar-in-ua/sdk";
import { API_URL } from "@/constants";

const authService = new AuthService(API_URL, ofetch);

interface State {
  user: ReducedUser | null;
  isFetched: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): State => ({
    user: null,
    isFetched: false,
  }),
  actions: {
    async loginUser(payload: LoginUserPayload) {
      const user = await authService.login(payload);
      this.user = user;
      this.isFetched = true;
    },
    async logoutUser() {
      await authService.logout();
      this.user = null;
      this.isFetched = false;
    },
    async fetchUser() {
      let user = null;
      try {
        user = await authService.authenticate();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        user = await authService.refresh();
      } finally {
        this.user = user;
        this.isFetched = true;
      }
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.user !== null;
    },
  },
});
