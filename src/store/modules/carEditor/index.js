import engine from "./engine";
import transmission from "./transmission";

import apiClient from "@/helpers/apiClient";
import {
  FETCH_CAR,
  PURGE_CAR_EDITOR,
  SAVE_CAR,
  CREATE_NEW_COMPLECTATION,
  SET_COMPLECTATION_OPTIONS,
  CHANGE_COMPLECTATION_NAME,
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
    isFetching: false,
    isEdited: false,
  }),
  modules: { engine, transmission },
  actions: {
    async [FETCH_CAR]({ commit }, carId) {
      const car = await apiClient.get(`/vehicles/edit/${carId}`);
      commit("updateFetched", true);
      commit(UPDATE_CAR, car);
    },
    async [SAVE_CAR]({ state, commit }) {
      commit("updateFetching", true);
      const updatedCar = await apiClient.put(`/vehicles/${state.car.id}`, {
        vehicle: prepareCar(state.car),
        complectations: state.car.complectations,
      });
      commit(UPDATE_CAR, updatedCar);
      commit("updateFetching", false);
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
    async [CHANGE_COMPLECTATION_NAME](
      { commit, state },
      [complectationIndex, name]
    ) {
      const targetComplectation = state.car.complectations[complectationIndex];
      await apiClient.put(`/complectations/${targetComplectation.id}`, {
        displayName: name,
      });
      commit(UPDATE_CAR_FIELD, [
        `complectations[${complectationIndex}].displayName`,
        name,
      ]);
    },
    [SET_COMPLECTATION_OPTIONS](
      { rootState, commit },
      [complectationIndex, optionIds]
    ) {
      commit(UPDATE_CAR_FIELD, [
        `complectations[${complectationIndex}].options`,
        optionIds.map((optionId) =>
          rootState.library.options.find((option) => option.id === optionId)
        ),
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
    ...createFetchingMutation("updateFetching", "isFetching"),
  },
};

export default carEditor;
