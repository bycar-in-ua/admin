import apiClient from "@/helpers/apiClient";
import { prepareOptionsByCategoties } from "@/helpers/preparers";
import {
  FETCH_OPTION_CATEGORIES,
  FETCH_VEHICLE_TYPES,
  FETCH_OPTIONS,
  CREATE_OPTION,
  CREATE_OPTION_CATEGORY,
  DELETE_OPTION,
  FETCH_COLORS,
} from "./actionTypes";
import { UPDATE_LIBRARY, UPDATE_LIBRARY_ITEM } from "./mutationTypes";
import images from "./images";

export const library = {
  modules: { images },
  state: () => ({
    types: [],
    optionCategories: [],
    options: [],
    colors: [],
  }),
  actions: {
    async [FETCH_VEHICLE_TYPES]({ commit }) {
      const types = await apiClient.get("/types");
      commit(UPDATE_LIBRARY, ["types", types]);
    },
    async [FETCH_OPTIONS]({ commit }) {
      const options = await apiClient.get("/options");
      commit(UPDATE_LIBRARY, ["options", options]);
    },
    async [FETCH_OPTION_CATEGORIES]({ commit }) {
      const optionCategories = await apiClient.get("/option-categories");
      commit(UPDATE_LIBRARY, ["optionCategories", optionCategories]);
    },
    async [CREATE_OPTION]({ commit, state }, [category, displayName]) {
      const newOption = await apiClient.post("/options", {
        category,
        displayName,
      });
      commit(UPDATE_LIBRARY, ["options", [...state.options, newOption]]);
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
    async [DELETE_OPTION]({ commit, state }, id) {
      await apiClient.delete(`/options/${id}`);
      commit(UPDATE_LIBRARY, [
        "options",
        state.options.filter((option) => option.id !== id),
      ]);
    },
    async [FETCH_COLORS]({ commit }, brandId = "") {
      const colors = await apiClient.get(`/colors/${brandId}`);
      commit(UPDATE_LIBRARY, ["colors", colors]);
    },
  },
  mutations: {
    [UPDATE_LIBRARY](state, [lib, data]) {
      state[lib] = data;
    },
    [UPDATE_LIBRARY_ITEM](state, [lib, item]) {
      const targetItemIndex = state[lib].findIndex(
        (libItem) => libItem.id === item.id
      );

      state[lib][targetItemIndex] = item;
    },
  },
  getters: {
    getOptionsByCategories(state) {
      return state.options.reduce(prepareOptionsByCategoties, {});
    },
  },
};

export default library;
