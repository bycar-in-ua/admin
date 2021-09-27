export const createFetchingMutation = (mutationName, fieldName) => {
  return {
    [mutationName](state, status) {
      state[fieldName] = status;
    },
  };
};
