import apiClient from "@/helpers/apiClient";
import { createFetchingMutation } from "@/helpers/fetchingMutationProvider";
import { FETCH_IMAGES } from "./actionTypes";
import { UPDATE_IMAGES, UPDATE_IMAGES_META } from "./mutationTypes";

export const images = {
  state: () => ({
    items: [],
    currentPage: 1,
    totalPages: null,
    isFetching: false,
  }),
  actions: {
    async [FETCH_IMAGES]({ commit }, page = 1) {
      try {
        commit("updateFetching", true);
        const images = await apiClient.get(`/images/${page}`);
        commit(UPDATE_IMAGES, images.items);
        commit(UPDATE_IMAGES_META, images.meta);
      } finally {
        commit("updateFetching", false);
      }
    },
  },
  mutations: {
    [UPDATE_IMAGES](state, items) {
      state.items = items;
    },
    [UPDATE_IMAGES_META](state, meta) {
      state.currentPage = meta.currentPage;
      state.totalPages = meta.totalPages;
    },
    ...createFetchingMutation(),
  },
};

export default images;
