import apiClient from "@/helpers/apiClient";
import {
  FETCH_VEHICLE_TYPES,
  FETCH_COLORS,
  CREATE_NEW_COLOR,
  DELETE_COLOR,
  UPDATE_COLOR,
} from "./actionTypes";
import { UPDATE_LIBRARY, UPDATE_LIBRARY_ITEM } from "./mutationTypes";
import images from "./images";
import options from "./options";

export const library = {
  modules: { images, options },
  state: () => ({
    types: [],
    colors: [],
  }),
  actions: {
    async [FETCH_VEHICLE_TYPES]({ commit }) {
      const types = await apiClient.get("/types");
      commit(UPDATE_LIBRARY, ["types", types]);
    },
    async [FETCH_COLORS]({ commit }, brandId = "") {
      const colors = await apiClient.get(`/colors/${brandId}`);
      commit(UPDATE_LIBRARY, ["colors", colors]);
    },
    async [CREATE_NEW_COLOR]({ commit, state }, colorData) {
      const newColor = await apiClient.post("/colors", colorData);
      commit(UPDATE_LIBRARY, ["colors", [...state.colors, newColor]]);
    },
    async [UPDATE_COLOR]({ commit }, color) {
      const uppdatedColor = await apiClient.put(`/colors/${color.id}`, color);

      commit(UPDATE_LIBRARY_ITEM, ["colors", uppdatedColor]);
    },
    async [DELETE_COLOR]({ commit, state }, id) {
      await apiClient.delete(`/colors/${id}`);
      commit(UPDATE_LIBRARY, [
        "colors",
        state.colors.filter((color) => color.id !== id),
      ]);
    },
  },
  mutations: {
    [UPDATE_LIBRARY](state, [lib, data]) {
      state[lib] = data;
    },
    [UPDATE_LIBRARY_ITEM](state, [lib, item]) {
      const targetItemIndex = state[lib].findIndex(
        (libItem) => libItem.id === item.id
      );

      state[lib][targetItemIndex] = item;
    },
  },
};

export default library;
