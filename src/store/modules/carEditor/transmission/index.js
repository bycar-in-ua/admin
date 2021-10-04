import apiClient from "@/helpers/apiClient";
import { cloneDeep } from "lodash-es";
import { set } from "lodash-es";
import { UPDATE_CAR_FIELD } from "../mutationTypes";
import {
  CREATE_NEW_TRANSMISSION,
  DELETE_TRANSMISSION,
  EDIT_TRANSMISSION,
  OPEN_CREATE_TRANSMISSION_MODAL,
  OPEN_EDIT_TRANSMISSION_MODAL,
} from "./actionTypes";
import {
  UPDATE_TRANSMISSION,
  UPDATE_TRANSMISSION_FIELD,
  UPDATE_TRANSMISSION_MODAL_OPEN,
} from "./mutationTypes";

export const newTransmissionBoilerplate = {
  drive: null,
  driveName: null,
  gearbox: {
    type: null,
    numberOfGears: null,
    technology: null,
    manufactureIndex: null,
    made: null,
  },
  brakingSystemType: null,
  suspensionTypeFront: null,
  suspensionTypeRear: null,
};

export const transmission = {
  state: () => ({
    transmission: {},
    isTransmissionModalOpen: false,
  }),
  actions: {
    [OPEN_CREATE_TRANSMISSION_MODAL]({ commit }) {
      commit(UPDATE_TRANSMISSION, cloneDeep(newTransmissionBoilerplate));
      commit(UPDATE_TRANSMISSION_MODAL_OPEN, true);
    },
    [OPEN_EDIT_TRANSMISSION_MODAL]({ commit }, transmission) {
      commit(UPDATE_TRANSMISSION, transmission);
      commit(UPDATE_TRANSMISSION_MODAL_OPEN, true);
    },
    async [CREATE_NEW_TRANSMISSION]({ state, rootState, commit }) {
      const newTransmission = await apiClient.post("/transmissions", {
        ...state.transmission,
        vehicle: rootState.carEditor.car.id,
      });
      commit(UPDATE_CAR_FIELD, [
        "transmissions",
        [...rootState.carEditor.car.transmissions, newTransmission],
      ]);
      commit(UPDATE_TRANSMISSION_MODAL_OPEN, false);
    },
    async [EDIT_TRANSMISSION]({ state, commit }) {
      await apiClient.put(
        `/transmissions/${state.transmission.id}`,
        state.transmission
      );
      commit(UPDATE_TRANSMISSION_MODAL_OPEN, false);
    },
    async [DELETE_TRANSMISSION]({ rootState, commit }, transmissionId) {
      await apiClient.delete(`/transmissions/${transmissionId}`);
      commit(UPDATE_CAR_FIELD, [
        "transmissions",
        rootState.carEditor.car.transmissions.filter(
          (transmission) => transmission.id !== transmissionId
        ),
      ]);
    },
  },
  mutations: {
    [UPDATE_TRANSMISSION_MODAL_OPEN](state, status) {
      state.isTransmissionModalOpen = status;
    },
    [UPDATE_TRANSMISSION](state, transmission) {
      state.transmission = transmission;
    },
    [UPDATE_TRANSMISSION_FIELD](state, [field, val]) {
      set(state.transmission, field, val);
    },
  },
  getters: {
    isTransmissionEdit(state) {
      return !!state.transmission.id;
    },
  },
};

export default transmission;
