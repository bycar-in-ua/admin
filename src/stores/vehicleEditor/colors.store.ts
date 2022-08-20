import { defineStore } from "pinia";
import { ColorDto as Color } from "@common/dto";
import apiClient from "@/helpers/apiClient";

export const useColorsStore = defineStore("colors", {
  state: (): Color[] => [],
  actions: {
    async fetchColors(brandId) {
      const colors = await apiClient.get(`/colors/${brandId}`);
      this.$patch(colors);
    },
    async createNewColor(colorData: Color) {
      const newColor = await apiClient.post("/colors", colorData);
      this.$state.push(newColor);
    },
    async updateColor(color) {
      const updatedColor = await apiClient.put(`/colors/${color.id}`, color);

      const targetIndex = this.$state.findIndex(
        (color) => color.id == updatedColor.id
      );
      this.$state[targetIndex] = updatedColor;
    },
    async deleteColor(id) {
      await apiClient.delete(`/colors/${id}`);
      const targetIndex = this.$state.findIndex((color) => color.id == id);
      console.log(targetIndex);
      this.$state.splice(targetIndex, 1);
    },
  },
});
