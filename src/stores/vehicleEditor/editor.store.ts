import { defineStore } from "pinia";

interface State {
  isModified: boolean;
  isFetching: boolean;
  initiallyFetched: boolean;
}

export const useEditorStore = defineStore("vehicle-editor", {
  state: (): State => ({
    isModified: false,
    isFetching: false,
    initiallyFetched: false,
  }),
});
