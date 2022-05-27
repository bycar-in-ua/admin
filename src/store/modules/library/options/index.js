import {
  FETCH_OPTION_CATEGORIES,
  CREATE_OPTION_CATEGORY,
  CREATE_OPTION,
  DELETE_OPTION,
  CHANGE_OPTION_CATEGORY,
  DELETE_OPTION_CATEGORY,
} from "./actionTypes";
import {
  SET_OPTIONS_BY_CATEGORIES,
  UPDATE_OPTION_CATEGORY,
  UPDATE_OPTIONS_OF_CATEGORY,
  UPDATE_SPECIFIC_OPTION,
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
      await apiClient.put(`/options/${option.id}`, {
        categoryId: targetCategoryId,
      });
      dispatch(FETCH_OPTION_CATEGORIES);
    },
    async [CREATE_OPTION]({ commit, state }, [categoryId, displayName]) {
      const newOption = await apiClient.post("/options", {
        categoryId,
        displayName,
      });
      commit(UPDATE_OPTIONS_OF_CATEGORY, [
        categoryId,
        [...state.categories[categoryId].options, newOption],
      ]);
    },
    async [CREATE_OPTION_CATEGORY]({ commit }, displayName) {
      const newOptionCategory = await apiClient.post("/option-categories", {
        displayName,
      });
      commit(UPDATE_OPTION_CATEGORY, [
        newOptionCategory.id,
        { ...newOptionCategory, options: [] },
      ]);
    },
    async [DELETE_OPTION_CATEGORY]({ dispatch }, catId) {
      await apiClient.delete(`/option-categories/${catId}`);
      await dispatch(FETCH_OPTION_CATEGORIES);
    },
    async [DELETE_OPTION]({ dispatch }, id) {
      await apiClient.delete(`/options/${id}`);
      dispatch(FETCH_OPTION_CATEGORIES);
    },
  },
  mutations: {
    [SET_OPTIONS_BY_CATEGORIES](state, optionCategories = []) {
      state.categories = {};
      optionCategories.forEach((optCat) => {
        state.categories[optCat.id] = optCat;
      });
    },
    [UPDATE_OPTION_CATEGORY](state, [catId, category]) {
      if (state.categories[catId]) {
        Object.assign(state.categories[catId], category);
      } else {
        state.categories[catId] = category;
      }
    },
    [UPDATE_OPTIONS_OF_CATEGORY](state, [catId, options]) {
      state.categories[catId].options = options;
    },
    [UPDATE_SPECIFIC_OPTION](state, [catId, option]) {
      state.categories[catId].options[
        state.categories[catId].options.findIndex((op) => op.id === option.id)
      ] = option;
    },
  },
  getters: {
    getOptionCategoriesForSelect(state) {
      return Object.values(state.categories).map((optCat) => ({
        value: optCat.id,
        label: optCat.displayName,
      }));
    },
  },
};

export default options;
