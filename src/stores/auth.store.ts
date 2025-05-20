import { defineStore } from "pinia";
import { type ReducedUser, type LoginUserPayload } from "@bycar-in-ua/sdk";
import auth from "@/plugins/auth";

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
      const user = await auth.login(payload); // .login(): Promise<never> but I got User here
      this.user = user;
      this.isFetched = true;
    },
    async logoutUser() {
      await auth.logout();
      this.user = null;
      this.isFetched = false;
    },
    async fetchUser() {
      console.log("fetchUser");

      let user = null;
      try {
        user = await auth.getUser();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        user = await auth.refresh();
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
