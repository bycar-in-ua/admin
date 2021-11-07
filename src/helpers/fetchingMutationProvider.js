export const createFetchingMutation = (
  mutationName = "updateFetching",
  fieldName = "isFetching"
) => {
  return {
    [mutationName](state, status) {
      state[fieldName] = status;
    },
  };
};
