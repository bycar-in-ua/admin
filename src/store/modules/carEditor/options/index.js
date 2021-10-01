import { prepareOptionIdsByCategoties } from "@/helpers/preparers";
import { UPDATE_IS_EDITED } from "../mutationTypes";
import { CHANGE_OPTIONS, SET_OPTIONS } from "./actionTypes";
import {
  UPDATE_ALL_OPTIONS,
  UPDATE_OPTIONS_BY_CATEGORY,
} from "./mutationTypes";
export const options = {
  state: () => ({}),
  actions: {
    [SET_OPTIONS]({ commit }, complectations) {
      let options = {};

      complectations.forEach((item) => {
        Object.assign(options, {
          [item.id]: item.options.reduce(prepareOptionIdsByCategoties, {}),
        });
      });

      commit(UPDATE_ALL_OPTIONS, options);
    },
    [CHANGE_OPTIONS]({ commit }, [complectationId, catId, options]) {
      commit(UPDATE_IS_EDITED, true);
      commit(UPDATE_OPTIONS_BY_CATEGORY, [complectationId, catId, options]);
    },
  },
  mutations: {
    [UPDATE_ALL_OPTIONS](state, val) {
      Object.assign(state, val);
    },
    [UPDATE_OPTIONS_BY_CATEGORY](state, [complectationId, catId, options]) {
      state[complectationId][catId] = options;
    },
  },
  getters: {
    getOptionsByComplectations(state) {
      let optionsByComplectations = {};

      for (const [key, val] of Object.entries(state)) {
        Object.assign(optionsByComplectations, {
          [key]: Object.entries(val).flatMap((item) => item[1]),
        });
      }

      return optionsByComplectations;
    },
  },
};

export default options;
