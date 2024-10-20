import { defineStore } from "pinia";
import type { ReducedUser, LoginUserPayload } from "@bycar-in-ua/sdk";
import apiClient from "@/helpers/apiClient";

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
      const user = await apiClient.post("/auth/login", payload);
      this.user = user;
      this.isFetched = true;
    },
    async logoutUser() {
      await apiClient.post("/auth/logout", {});
      this.user = null;
      this.isFetched = false;
    },
    async fetchUser() {
      let user = null;
      try {
        user = await apiClient.get("/auth");
      } catch (error) {
        user = await apiClient.get("/auth/refresh");
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
