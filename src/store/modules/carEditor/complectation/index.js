import {
  OPEN_COMPLECTATION_EDIT_MODAL,
  COPY_COMPLECTATION_DATA,
  CLEAN_UP_COMPLECTATION,
  SET_POWER_UNIT_OPTION,
  DELETE_POWER_UNIT,
  CREATE_NEW_POWER_UNIT,
  SAVE_COMPLECTATION,
  DELETE_COMPLECTATION,
} from "./actionTypes";
import {
  UPDATE_COMPLECTATION,
  UPDATE_COMPLECTATION_FIELD,
} from "./mutationTypes";
import { UPDATE_CAR_FIELD } from "../mutationTypes";
import { set } from "lodash";
import apiClient from "@/helpers/apiClient";

const complectationInitialState = {
  id: undefined,
  displayName: "",
  base: false,
  options: [],
  powerUnits: [],
};

const complectation = {
  state: () => ({ ...complectationInitialState }),
  actions: {
    [OPEN_COMPLECTATION_EDIT_MODAL]({ commit }, complectation) {
      commit(UPDATE_COMPLECTATION, complectation);
    },
    [CLEAN_UP_COMPLECTATION]({ commit }) {
      commit(UPDATE_COMPLECTATION, complectationInitialState);
    },
    [COPY_COMPLECTATION_DATA]({ commit, rootState }, referenceComplectationId) {
      const referenceComplectation =
        rootState.carEditor.car.complectations.find(
          (cmpl) => cmpl.id === referenceComplectationId
        );

      if (referenceComplectation && referenceComplectation.options) {
        commit(UPDATE_COMPLECTATION_FIELD, [
          `options`,
          referenceComplectation.options,
        ]);
        // commit(UPDATE_ALL_OPTIONS, state.car.complectations);
        commit(UPDATE_COMPLECTATION_FIELD, [
          `powerUnits`,
          referenceComplectation.powerUnits.map((unit) => ({
            ...unit,
            id: undefined,
          })),
        ]);
      }
    },
    [SET_POWER_UNIT_OPTION]({ commit }, [powerUnitIndex, field, value]) {
      commit(UPDATE_COMPLECTATION_FIELD, [
        `powerUnits[${powerUnitIndex}][${field}]`,
        value,
      ]);
    },
    async [CREATE_NEW_POWER_UNIT]({ commit, state }) {
      const newPowerUnit = await apiClient.post("/power-units", {
        complectationId: state.id,
      });
      commit(UPDATE_COMPLECTATION_FIELD, [
        "powerUnits",
        [...state.powerUnits, newPowerUnit],
      ]);

      return newPowerUnit.id;
    },
    async [DELETE_POWER_UNIT]({ commit, state }, powerUnit) {
      await apiClient.delete(`/power-units/${powerUnit.id}`);
      commit(UPDATE_COMPLECTATION_FIELD, [
        `powerUnits`,
        state.powerUnits.filter((unit) => unit.id !== powerUnit.id),
      ]);
    },
    async [SAVE_COMPLECTATION]({ state, commit, rootState }, options) {
      const updatedComplectation = await apiClient.put(
        `/complectations/${state.id}`,
        {
          ...state,
          options: options,
        }
      );

      commit(UPDATE_CAR_FIELD, [
        "complectations",
        rootState.carEditor.car.complectations.filter((compl) =>
          compl.id == updatedComplectation.id ? updatedComplectation : compl
        ),
      ]);
    },
    async [DELETE_COMPLECTATION]({ commit, rootState }, cmplId) {
      await apiClient.delete(`/complectations/${cmplId}`);
      commit(UPDATE_CAR_FIELD, [
        "complectations",
        rootState.carEditor.car.complectations.filter(
          (cmpl) => cmpl.id !== cmplId
        ),
      ]);
    },
  },
  mutations: {
    [UPDATE_COMPLECTATION](state, complectation) {
      Object.assign(state, complectation);
    },
    [UPDATE_COMPLECTATION_FIELD](state, [field, value]) {
      set(state, field, value);
    },
  },
};

export default complectation;
