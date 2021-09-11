import apiClient from "@/helpers/apiClient";
import {
  CREATE_NEW_BRAND,
  OPEN_BRAND_MODAL,
  SAVE_BRAND_CHANGES,
} from "./actionTypes";
import {
  UPDATE_BRAND,
  UPDATE_BRAND_MODAL_OPEN,
  UPDATE_BRAND_FIELD,
} from "./mutationTypes";

const initialBrandState = {
  id: null,
  displayName: null,
  name: null,
  logo: null,
};

export default {
  state: () => ({
    brand: initialBrandState,
    isOpen: false,
    isFetching: false,
  }),
  actions: {
    [OPEN_BRAND_MODAL]({ commit }, brand = initialBrandState) {
      commit(UPDATE_BRAND, brand);
      commit(UPDATE_BRAND_MODAL_OPEN, true);
    },
    async [SAVE_BRAND_CHANGES]({ commit, state }) {
      try {
        commit("updateFetching", true);
        await apiClient.put(`/brands/${state.brand.id}`, state.brand);
        commit("updateFetching", false);
        commit(UPDATE_BRAND_MODAL_OPEN, false);
      } catch (error) {
        console.log(error);
        commit("updateFetching", false);
      }
    },
    async [CREATE_NEW_BRAND]({ commit, state }) {
      try {
        commit("updateFetching", true);
        await apiClient.post("/brands", state.brand);
        commit("updateFetching", false);
        commit(UPDATE_BRAND_MODAL_OPEN, false);
      } catch (error) {
        console.log(error);
        commit("updateFetching", false);
      }
    },
  },
  mutations: {
    [UPDATE_BRAND_MODAL_OPEN](state, status) {
      state.isOpen = status;
    },
    [UPDATE_BRAND](state, brand) {
      state.brand = brand;
    },
    [UPDATE_BRAND_FIELD](state, [field, val]) {
      state.brand[field] = val;
    },
    updateFetching(state, status) {
      state.isFetching = status;
    },
  },
};
