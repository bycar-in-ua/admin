import {
  FETCH_OPTION_CATEGORIES,
  CREATE_OPTION_CATEGORY,
  CREATE_OPTION,
  DELETE_OPTION,
  CHANGE_OPTION_CATEGORY,
} from "./actionTypes";
import {
  SET_OPTIONS_BY_CATEGORIES,
  UPDATE_OPTION_CATEGORY,
  UPDATE_OPTIONS_OF_CATEGORY,
} from "./mutationTypes";
import apiClient from "@/helpers/apiClient";

export const options = {
  state: () => ({
    categories: {},
  }),
  actions: {
    async [FETCH_OPTION_CATEGORIES]({ commit }) {
      const optionCategories = await apiClient.get(
        "/option-categories/with-options"
      );
      commit(SET_OPTIONS_BY_CATEGORIES, optionCategories);
    },
    async [CHANGE_OPTION_CATEGORY]({ dispatch }, [option, targetCategoryId]) {
      await apiClient.put(`/options/${option.value}`, {
        categoryId: targetCategoryId,
      });
      dispatch(FETCH_OPTION_CATEGORIES);
    },
    async [CREATE_OPTION]({ commit, state }, [category, displayName]) {
      const newOption = await apiClient.post("/options", {
        category,
        displayName,
      });
      commit(UPDATE_OPTIONS_OF_CATEGORY, [
        category.id,
        [...state.categories[category.id].options, newOption],
      ]);
    },
    async [CREATE_OPTION_CATEGORY]({ commit }, displayName) {
      const newOptionCategory = await apiClient.post("/option-categories", {
        displayName,
      });
      commit(UPDATE_OPTION_CATEGORY, [newOptionCategory.id, newOptionCategory]);
    },
    async [DELETE_OPTION]({ dispatch }, id) {
      await apiClient.delete(`/options/${id}`);
      dispatch(FETCH_OPTION_CATEGORIES);
    },
  },
  mutations: {
    [SET_OPTIONS_BY_CATEGORIES](state, optionCategories = []) {
      optionCategories.forEach((optCat) => {
        state.categories[optCat.id] = optCat;
      });
    },
    [UPDATE_OPTION_CATEGORY](state, [catId, value]) {
      state.categories[catId] = value;
    },
    [UPDATE_OPTIONS_OF_CATEGORY](state, [catId, options]) {
      state.categories[catId].options = options;
    },
  },
};

export default options;
