import engine from "./engine";
import transmission from "./transmission";

import apiClient from "@/helpers/apiClient";
import {
  FETCH_CAR,
  PURGE_CAR_EDITOR,
  SAVE_CAR,
  CREATE_NEW_COMPLECTATION,
} from "./actionTypes";
import { UPDATE_CAR, UPDATE_CAR_FIELD } from "./mutationTypes";
import { createFetchingMutation } from "@/helpers/fetchingMutationProvider";
import { set } from "lodash";
import { prepareCar } from "@/helpers/preparers";

export const carEditorNamespace = (action) => `carEditor/${action}`;

const carInitialState = {
  engines: [],
  transmissions: [],
  complectations: [],
};

export const carEditor = {
  namespaced: true,
  state: () => ({
    car: carInitialState,
    isFetched: false,
    isEdited: false,
  }),
  modules: { engine, transmission },
  actions: {
    async [FETCH_CAR]({ commit }, carId) {
      const car = await apiClient.get(`/vehicles/edit/${carId}`);
      commit("updateFetched", true);
      commit(UPDATE_CAR, car);
    },
    async [SAVE_CAR]({ state }) {
      await apiClient.put(`/vehicles/${state.car.id}`, prepareCar(state.car));
    },
    async [CREATE_NEW_COMPLECTATION]({ commit, state }, name) {
      const newComplectation = await apiClient.post("/complectations", {
        displayName: name,
        vehicle: state.car.id,
      });
      commit(UPDATE_CAR_FIELD, [
        "complectations",
        [...state.car.complectations, newComplectation],
      ]);
    },
    [PURGE_CAR_EDITOR]({ commit }) {
      commit(UPDATE_CAR, carInitialState);
      commit("updateFetched", false);
    },
  },
  mutations: {
    [UPDATE_CAR](state, car) {
      state.isEdited = false;
      state.car = car;
    },
    [UPDATE_CAR_FIELD](state, [field, val]) {
      state.isEdited = true;
      set(state.car, field, val);
    },
    ...createFetchingMutation("updateFetched", "isFetched"),
  },
};

export default carEditor;
