import apiClient from "@/helpers/apiClient";
import { FETCH_VEHICLE_TYPES } from "./actionTypes";
import { UPDATE_LIBRARY } from "./mutationTypes";

export const library = {
  state: () => ({
    types: [],
  }),
  actions: {
    async [FETCH_VEHICLE_TYPES]({ commit }) {
      const types = await apiClient.get("/types");
      commit(UPDATE_LIBRARY, ["types", types]);
    },
  },
  mutations: {
    [UPDATE_LIBRARY](state, [lib, data]) {
      state[lib] = data;
    },
  },
};

export default library;
