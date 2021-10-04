import { FETCH_BRANDS } from "./actionTypes";
import { UPDATE_BRANDS } from "./mutationTypes";

import apiClient from "@/helpers/apiClient";
import modal from "./modal";

export const brandNamespace = (action) => `brands/${action}`;

export const brands = {
  namespaced: true,
  modules: { modal },
  state: () => ({
    all: [],
  }),
  actions: {
    async [FETCH_BRANDS]({ commit }) {
      try {
        const brands = await apiClient.get("/brands");
        commit(UPDATE_BRANDS, brands);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    [UPDATE_BRANDS](state, brands) {
      state.all = brands;
    },
  },
};

export default brands;
