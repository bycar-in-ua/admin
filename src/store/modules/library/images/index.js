import apiClient from "@/helpers/apiClient";
import { createFetchingMutation } from "@/helpers/fetchingMutationProvider";
import { FETCH_IMAGES, SET_IMAGES } from "./actionTypes";
import {
  UPDATE_IMAGES,
  UPDATE_IMAGES_FETCHING,
  UPDATE_IMAGES_META,
} from "./mutationTypes";

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
        commit(UPDATE_IMAGES_FETCHING, true);
        const images = await apiClient.get(`/images/${page}`);
        commit(UPDATE_IMAGES, images.items);
        commit(UPDATE_IMAGES_META, images.meta);
      } finally {
        commit(UPDATE_IMAGES_FETCHING, false);
      }
    },
    [SET_IMAGES]({ commit }, images) {
      commit(UPDATE_IMAGES, images);
      commit(UPDATE_IMAGES_META, { currentPage: 1, totalPages: null });
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
    ...createFetchingMutation(UPDATE_IMAGES_FETCHING),
  },
};

export default images;
