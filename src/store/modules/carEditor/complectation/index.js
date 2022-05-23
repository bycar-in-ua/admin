import {
  OPEN_COMPLECTATION_EDIT_MODAL,
  COPY_COMPLECTATION_DATA,
  CLEAN_UP_COMPLECTATION,
} from "./actionTypes";
import {
  UPDATE_COMPLECTATION,
  UPDATE_COMPLECTATION_FIELD,
} from "./mutationTypes";

const complectationInitialState = {
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
  },
  mutations: {
    [UPDATE_COMPLECTATION](state, complectation) {
      Object.assign(state, complectation);
    },
    [UPDATE_COMPLECTATION_FIELD](state, [field, value]) {
      state[field] = value;
    },
  },
};

export default complectation;
