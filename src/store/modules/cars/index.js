import apiClient from "@/helpers/apiClient";
import { createFetchingMutation } from "@/helpers/fetchingMutationProvider";
import { FETCH_CARS } from "./actionTypes";
import { UPDATE_CARS, UPDATE_CARS_META } from "./mutationTypes";

export const cars = {
  state: () => ({
    items: [],
    page: 1,
    pageCount: null,
    pageSize: null,
    totalItems: null,
    isFetching: false,
  }),
  actions: {
    async [FETCH_CARS]({ commit }, page = 1) {
      try {
        commit("updateFetching", true);
        const cars = await apiClient.get(`/vehicles?page=${page}`);
        commit(UPDATE_CARS, cars.items);
        commit(UPDATE_CARS_META, cars.meta);
      } finally {
        commit("updateFetching", false);
      }
    },
  },
  mutations: {
    [UPDATE_CARS](state, cars) {
      state.items = cars;
    },
    [UPDATE_CARS_META](state, meta) {
      state.page = meta.currentPage;
      state.pageCount = meta.totalPages;
      state.pageSize = meta.itemsPerPage;
      state.totalItems = meta.totalItems;
    },
    ...createFetchingMutation(),
  },
};

export default cars;
