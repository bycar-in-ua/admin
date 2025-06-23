import { defineStore } from "pinia";
import { ColorsPrivateService, type Color } from "@bycar-in-ua/sdk";
import { API_URL } from "@/constants";

const colorsService = ColorsPrivateService.create(API_URL);

export const useColorsStore = defineStore("colors", {
  state: (): Color[] => [],
  actions: {
    async fetchColors(brandId: number) {
      const colors = await colorsService.getColorsOfBrand(brandId);
      this.$patch(colors);
    },
    async createNewColor(colorData: Color) {
      const newColor = await colorsService.createColor(colorData);
      this.$state.push(newColor);
    },
    async updateColor(color: Partial<Color>) {
      const updatedColor = await colorsService.updateColor(color.id, color);

      const targetIndex = this.$state.findIndex(
        (color) => color.id == updatedColor.id
      );
      this.$state[targetIndex] = updatedColor;
    },
    async deleteColor(id: number) {
      await colorsService.deleteColor(id);
      const targetIndex = this.$state.findIndex((color) => color.id == id);
      console.log(targetIndex);
      this.$state.splice(targetIndex, 1);
    },
  },
});
