import { defineStore } from "pinia";
import { OptionsPrivateService, type OptionCategory } from "@bycar-in-ua/sdk";
import { API_URL } from "@/constants";

const optionsService = OptionsPrivateService.create(API_URL);

interface State {
  categories: { [k: number | string]: OptionCategory };
}

export const useOptionsStore = defineStore("options", {
  state: (): State => ({
    categories: {},
  }),
  actions: {
    async fetchOptionsByCategories() {
      const optionCategories =
        await optionsService.getOptionCategoriesWithOptions();
      this.categories = {};

      optionCategories.forEach((optCat) => {
        this.categories[optCat.id] = optCat;
      });
    },
    async changeOptionCategory(option, targetCategoryId) {
      await optionsService.updateOption(option.id, {
        categoryId: targetCategoryId,
      });
      await this.fetchOptionsByCategories();
    },
    async createOption(categoryId, displayName) {
      const newOption = await optionsService.createOption({
        categoryId,
        displayName,
      });
      this.categories[categoryId].options.push(newOption);
    },
    async createOptionCategory(displayName) {
      const newOptionCategory = await optionsService.createOptionCategory({
        displayName,
      });
      this.updateOptionCategory(newOptionCategory);
    },
    async deleteOptionCategory(catId) {
      await optionsService.deleteOptionCategory(catId);
      await this.fetchOptionsByCategories();
    },
    async deleteOption(id) {
      await optionsService.deleteOption(id);
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
    options(state) {
      return Object.values(state.categories).flatMap(
        (optCat) => optCat.options
      );
    },
  },
});
