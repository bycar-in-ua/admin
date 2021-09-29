import apiClient from "@/helpers/apiClient";
import { prepareOptionsByCategoties } from "@/helpers/preparers";
import {
  FETCH_OPTION_CATEGORIES,
  FETCH_VEHICLE_TYPES,
  FETCH_OPTIONS,
  CREATE_OPTION_CATEGORY,
} from "./actionTypes";
import { UPDATE_LIBRARY } from "./mutationTypes";

export const library = {
  state: () => ({
    types: [],
    optionCategories: [],
    options: [],
  }),
  actions: {
    async [FETCH_VEHICLE_TYPES]({ commit }) {
      const types = await apiClient.get("/types");
      commit(UPDATE_LIBRARY, ["types", types]);
    },
    async [FETCH_OPTION_CATEGORIES]({ commit }) {
      const optionCategories = await apiClient.get("/option-categories");
      commit(UPDATE_LIBRARY, ["optionCategories", optionCategories]);
    },
    async [CREATE_OPTION_CATEGORY]({ commit, state }, displayName) {
      const newOptionCategory = await apiClient.post("/option-categories", {
        displayName,
      });
      commit(UPDATE_LIBRARY, [
        "optionCategories",
        [...state.optionCategories, newOptionCategory],
      ]);
    },
    async [FETCH_OPTIONS]({ commit }) {
      const options = await apiClient.get("/options");
      commit(UPDATE_LIBRARY, ["options", options]);
    },
  },
  mutations: {
    [UPDATE_LIBRARY](state, [lib, data]) {
      state[lib] = data;
    },
  },
  getters: {
    getOptionsByCategories(state) {
      return state.options.reduce(prepareOptionsByCategoties, {});
    },
  },
};

export default library;
