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
  SAVE_CAR_IMAGES,
  SAVE_CAR_COLORS,
  DELETE_COMPLECTATION,
} from "./actionTypes";
import {
  UPDATE_CAR,
  UPDATE_CAR_FIELD,
  UPDATE_IS_EDITED,
  PUSH_NEW_POWER_UNIT,
  SET_DEFAULT_COMPLECTATION,
} from "./mutationTypes";
import { createFetchingMutation } from "@/helpers/fetchingMutationProvider";
import { set } from "lodash";
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
      const car = await apiClient.get(`/vehicles/${carId}`);
      commit("updateFetched", true);
      dispatch(SET_OPTIONS, car.complectations);
      commit(UPDATE_CAR, car);
    },
    async [SAVE_CAR]({ state, commit, getters }) {
      try {
        commit("updateFetching", true);
        const updatedCar = await apiClient.put(`/vehicles/${state.car.id}`, {
          ...state.car,
          complectations: state.car.complectations.map((cmpl) => ({
            ...cmpl,
            options: getters["getOptionsByComplectations"][cmpl.id] || [],
          })),
        });
        commit(UPDATE_CAR, updatedCar);
      } finally {
        commit("updateFetching", false);
      }
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
    async [SAVE_CAR_IMAGES]({ state, commit }, imagesIds) {
      const carImages = await apiClient.put(
        `/vehicles/${state.car.id}/images`,
        imagesIds
      );
      commit(UPDATE_CAR_FIELD, ["images", carImages]);
    },
    async [SAVE_CAR_COLORS]({ state, commit }, colorsIds) {
      const carColors = await apiClient.put(
        `/vehicles/${state.car.id}/colors`,
        colorsIds
      );
      commit(UPDATE_CAR_FIELD, ["colors", carColors]);
    },
    async [DELETE_COMPLECTATION]({ commit, state }, complectationId) {
      await apiClient.delete(`/complectations/${complectationId}`);
      commit(UPDATE_CAR_FIELD, [
        "complectations",
        state.car.complectations.filter(
          (complectation) => complectation.id !== complectationId
        ),
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
      state.car.complectations[complectationIndex].powerUnits.push({
        ...powerUnitEmptyTemplte,
      });
    },
    [SET_DEFAULT_COMPLECTATION](state, complectationId) {
      state.isEdited = true;
      state.car.complectations.forEach((cmpl) => {
        if (cmpl.id === complectationId) {
          cmpl.base = true;
          return;
        }
        cmpl.base = false;
      });
    },
    ...createFetchingMutation("updateFetched", "isFetched"),
    ...createFetchingMutation("updateFetching", "isFetching"),
  },
  getters: {
    getCarImagesIds(state) {
      return state.car.images.map((image) => image.id);
    },
  },
};

export default carEditor;
