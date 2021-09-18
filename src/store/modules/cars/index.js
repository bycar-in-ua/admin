import apiClient from "@/helpers/apiClient";
import { FETCH_CARS } from "./actionTypes";
import { UPDATE_CARS } from "./mutationTypes";

export const cars = {
  state: () => ({ all: [] }),
  actions: {
    async [FETCH_CARS]({ commit }) {
      const cars = await apiClient.get("/vehicles");
      commit(UPDATE_CARS, cars);
    },
  },
  mutations: {
    [UPDATE_CARS](state, cars) {
      state.all = cars;
    },
  },
};

export default cars;
