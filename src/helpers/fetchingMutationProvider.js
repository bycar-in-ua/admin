export const createFetchingMutation = (fieldName) => {
  return {
    updateFetched(state, status) {
      state[fieldName] = status;
    },
  };
};
