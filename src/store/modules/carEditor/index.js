import engine from "./engine";
import transmission from "./transmission";
import options from "./options";

import apiClient from "@/helpers/apiClient";
import {
  FETCH_CAR,
  PURGE_CAR_EDITOR,
  SAVE_CAR,
  CREATE_NEW_COMPLECTATION,
  SET_COMPLECTATION_OPTIONS,
  CHANGE_COMPLECTATION_NAME,
  SET_POWER_UNIT_OPTION,
} from "./actionTypes";
import {
  UPDATE_CAR,
  UPDATE_CAR_FIELD,
  UPDATE_IS_EDITED,
  PUSH_NEW_POWER_UNIT,
} from "./mutationTypes";
import { createFetchingMutation } from "@/helpers/fetchingMutationProvider";
import { set } from "lodash";
import { prepareCar } from "@/helpers/preparers";
import { SET_OPTIONS } from "./options/actionTypes";

export const carEditorNamespace = (action) => `carEditor/${action}`;

const carInitialState = {
  engines: [],
  transmissions: [],
  complectations: [],
};

const powerUnitEmptyTemplte = {
  price: null,
  speedUp100: null,
  maxSpeed: null,
  consumption: { city: null, highway: null, mixed: null },
  engine: { id: null },
  transmission: { id: null },
};

export const carEditor = {
  namespaced: true,
  state: () => ({
    car: carInitialState,
    isFetched: false,
    isFetching: false,
    isEdited: false,
  }),
  modules: { engine, transmission, options },
  actions: {
    async [FETCH_CAR]({ commit, dispatch }, carId) {
      const car = await apiClient.get(`/vehicles/edit/${carId}`);
      commit("updateFetched", true);
      dispatch(SET_OPTIONS, car.complectations);
      commit(UPDATE_CAR, car);
    },
    async [SAVE_CAR]({ state, commit, getters }) {
      commit("updateFetching", true);
      const updatedCar = await apiClient.put(`/vehicles/${state.car.id}`, {
        vehicle: prepareCar(state.car),
        complectations: state.car.complectations.map((cmpl) => ({
          ...cmpl,
          options: getters["getOptionsByComplectations"][cmpl.id] || [],
        })),
      });
      commit(UPDATE_CAR, updatedCar);
      commit("updateFetching", false);
    },
    async [CREATE_NEW_COMPLECTATION]({ commit, state, dispatch }, name) {
      const newComplectation = await apiClient.post("/complectations", {
        displayName: name,
        vehicle: state.car.id,
      });
      commit(UPDATE_CAR_FIELD, [
        "complectations",
        [...state.car.complectations, newComplectation],
      ]);
      dispatch(SET_OPTIONS, state.car.complectations);
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
    [SET_POWER_UNIT_OPTION](
      { commit },
      [complectationIndex, powerUnitIndex, field, value]
    ) {
      commit(UPDATE_CAR_FIELD, [
        `complectations[${complectationIndex}].powerUnits[${powerUnitIndex}][${field}]`,
        value,
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
    [UPDATE_IS_EDITED](state, status) {
      state.isEdited = status;
    },
    [PUSH_NEW_POWER_UNIT](state, complectationIndex) {
      console.log(complectationIndex, "complectationIndex");
      state.car.complectations[complectationIndex].powerUnits.push({
        ...powerUnitEmptyTemplte,
      });
    },
    ...createFetchingMutation("updateFetched", "isFetched"),
    ...createFetchingMutation("updateFetching", "isFetching"),
  },
};

export default carEditor;
