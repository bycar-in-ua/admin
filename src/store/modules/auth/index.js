import apiClient from "../../../helpers/apiClient";
import { FETCH_USER, LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { UPDATE_USER } from "./mutationTypes";

export default {
  state: () => ({
    user: null,
    isFetched: false,
  }),
  actions: {
    async [LOGIN_USER]({ commit }, payload) {
      const user = await apiClient.post("/auth/login", {
        username: payload.username,
        password: payload.password,
      });
      commit(UPDATE_USER, user);
      commit("updateFetched", true);
    },
    async [LOGOUT_USER]({ commit }) {
      try {
        commit("updateFetched", false);
        await apiClient.post("/auth/logout");
        commit(UPDATE_USER, null);
      } catch (error) {
        commit("updateFetched", true);
      }
    },
    async [FETCH_USER]({ commit }) {
      let user = null;
      try {
        user = await apiClient.get("/auth");
      } catch (error) {
        user = await apiClient.get("/auth/refresh");
      } finally {
        commit("updateFetched", true);
      }
      commit(UPDATE_USER, user);
    },
  },
  mutations: {
    [UPDATE_USER](state, user) {
      state.user = user;
    },
    updateFetched(state, status) {
      state.isFetched = status;
    },
  },
  getters: {
    isLogedIn: (state) => !!state.user,
  },
};
