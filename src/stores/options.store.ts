import { defineStore } from "pinia";
import { OptionCategoryDto as OptionCategory } from "@common/dto";
import apiClient from "@/helpers/apiClient";

interface State {
  categories: { [k: number | string]: OptionCategory };
}

export const useOptionsStore = defineStore("options", {
  state: (): State => ({
    categories: {},
  }),
  actions: {
    async fetchOptionsByCategories() {
      const optionCategories = await apiClient.get(
        "/option-categories/with-options"
      );
      this.categories = {};

      optionCategories.forEach((optCat) => {
        this.categories[optCat.id] = optCat;
      });
    },
    async changeOptionCategory(option, targetCategoryId) {
      await apiClient.put(`/options/${option.id}`, {
        categoryId: targetCategoryId,
      });
      await this.fetchOptionsByCategories();
    },
    async createOption(categoryId, displayName) {
      const newOption = await apiClient.post("/options", {
        categoryId,
        displayName,
      });
      this.categories[categoryId].options.push(newOption);
    },
    async createOptionCategory(displayName) {
      const newOptionCategory = await apiClient.post("/option-categories", {
        displayName,
      });
      this.updateOptionCategory(newOptionCategory);
    },
    async deleteOptionCategory(catId) {
      await apiClient.delete(`/option-categories/${catId}`);
      await this.fetchOptionsByCategories();
    },
    async deleteOption(id) {
      await apiClient.delete(`/options/${id}`);
      await this.fetchOptionsByCategories();
    },
    updateOptionCategory(category: OptionCategory) {
      if (this.categories[category.id]) {
        Object.assign(this.categories[category.id], category);
      } else {
        this.categories[category.id] = category;
      }
    },
  },
  getters: {
    optionCategoriesForSelect(state) {
      return Object.values(state.categories).map((optCat) => ({
        value: optCat.id,
        label: optCat.displayName,
      }));
    },
  },
});
