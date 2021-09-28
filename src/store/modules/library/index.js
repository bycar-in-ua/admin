import apiClient from "@/helpers/apiClient";
import {
  FETCH_OPTION_CATEGORIES,
  FETCH_VEHICLE_TYPES,
  FETCH_OPTIONS,
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
      return state.options.reduce((acc, cur) => {
        if (acc[cur.category.id]) {
          acc[cur.category.id].push(prepareOption(cur));
        } else {
          acc[cur.category.id] = [];
          acc[cur.category.id].push(prepareOption(cur));
        }
        return acc;
      }, {});
    },
  },
};

function prepareOption(option) {
  return {
    label: option.displayName,
    value: option.id,
  };
}

export default library;
