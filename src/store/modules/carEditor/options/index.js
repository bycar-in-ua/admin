import { SET_OPTIONS } from "./actionTypes";
/* eslint-disable */
export const options = {
  state: () => ({}),
  actions: {
    [SET_OPTIONS]({ commit }, complectations) {
      console.log(complectations, "complectations");
    },
  },
};

export default options;
