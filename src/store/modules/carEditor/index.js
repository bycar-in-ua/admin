import engine from "./engine";
import transmission from "./transmission";

import apiClient from "@/helpers/apiClient";
import { FETCH_CAR } from "./actionTypes";
import { UPDATE_CAR, UPDATE_CAR_FIELD } from "./mutationTypes";
import { createFetchingMutation } from "@/helpers/fetchingMutationProvider";
import { set } from "lodash";

export const carEditorNamespace = (action) => `carEditor/${action}`;

export const carEditor = {
  namespaced: true,
  state: () => ({
    car: {
      engines: [],
      transmissions: [],
      complectations: [],
    },
    isFetched: false,
  }),
  modules: { engine, transmission },
  actions: {
    async [FETCH_CAR]({ commit }, carId) {
      const car = await apiClient.get(`/vehicles/edit/${carId}`);
      commit("updateFetched", true);
      commit(UPDATE_CAR, car);
    },
  },
  mutations: {
    [UPDATE_CAR](state, car) {
      state.car = car;
    },
    [UPDATE_CAR_FIELD](state, [field, val]) {
      set(state.car, field, val);
    },
    ...createFetchingMutation("isFetched"),
  },
};

export default carEditor;
