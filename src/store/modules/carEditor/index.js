import transmission from "./transmission";
import complectation from "./complectation";

import apiClient from "@/helpers/apiClient";
import {
  FETCH_CAR,
  PURGE_CAR_EDITOR,
  SAVE_CAR,
  SAVE_CAR_IMAGES,
  SAVE_CAR_COLORS,
  DELETE_COMPLECTATION,
} from "./actionTypes";
import {
  UPDATE_CAR,
  UPDATE_CAR_FIELD,
  UPDATE_IS_EDITED,
} from "./mutationTypes";
import { createFetchingMutation } from "@/helpers/fetchingMutationProvider";
import { set } from "lodash";
import { prepareCar } from "@/helpers/preparers";

/**
 *
 * @param {string} action
 * @returns {string} Action name with namespace
 */
export const carEditorNamespace = (action) => `carEditor/${action}`;

const carInitialState = {
  engines: [],
  transmissions: [],
  complectations: [],
  images: [],
  colors: [],
};

export const carEditor = {
  namespaced: true,
  state: () => ({
    car: carInitialState,
    isFetched: false,
    isFetching: false,
    isEdited: false,
  }),
  modules: { transmission, complectation },
  actions: {
    async [FETCH_CAR]({ commit }, carSlug) {
      const car = await apiClient.get(`/vehicles/${carSlug}/for-edit`);
      commit("updateFetched", true);
      commit(UPDATE_CAR, prepareCar(car));
    },
    async [SAVE_CAR]({ state, commit }) {
      try {
        commit("updateFetching", true);
        const updatedCar = await apiClient.put(
          `/vehicles/${state.car.id}`,
          state.car
        );
        commit(UPDATE_CAR, prepareCar(updatedCar));
      } finally {
        commit("updateFetching", false);
      }
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
    ...createFetchingMutation("updateFetched", "isFetched"),
    ...createFetchingMutation("updateFetching", "isFetching"),
  },
  getters: {
    getCarImagesIds(state) {
      return state.car.images.map((image) => image.id);
    },
    getEnginesOptions(state) {
      return state.car.engines.map((engine) => ({
        label: engine.displayName + ` ${engine.power} hp`,
        value: engine.id,
      }));
    },
    getTransmissionsOptions(state) {
      return (t) =>
        state.car.transmissions.map((transmission) => ({
          label: `${transmission.drive} - ${
            transmission?.gearbox?.numberOfGears
          } ${t(
            "vehicle.transmission.gearbox.types." + transmission?.gearbox?.type
          )}`,
          value: transmission.id,
        }));
    },
    enginesMapById(state) {
      const engines = new Map();

      for (const engine of state.car.engines) {
        engines.set(engine.id, engine);
      }

      return engines;
    },
    transmissionsMapById(state) {
      const transmissions = new Map();

      for (const transmission of state.car.transmissions) {
        transmissions.set(transmission.id, transmission);
      }

      return transmissions;
    },
    getCarBrandName(state) {
      return state.car?.brand?.name || "";
    },
  },
};

export default carEditor;
