import { defineStore } from "pinia";
import { PostCategoryDto as PostCategory } from "@common/dto";
import apiClient from "@/helpers/apiClient";

interface PostCategoriesState {
  categories: PostCategory[];
}

export const usePostCategoriesStore = defineStore("post-categories", {
  state: (): PostCategoriesState => ({
    categories: [],
  }),
  actions: {
    async fetchPostCategories() {
      try {
        const postCategories = await apiClient.get("/post-categories");

        this.$reset();

        this.categories = postCategories;
      } catch (error) {
        console.log(error, "in store");
      }
    },
  },
});

interface PostCategoryModal {
  category: PostCategory;
  isModalOpen: boolean;
}

export const usePostCategoryModalStore = defineStore(
  "post-categories-modal",
  {
    state: (): PostCategoryModal => ({
      category: { id: undefined, title: "", slug: "", parent: undefined },
      isModalOpen: false,
    }),
    getters: {
      isEdit: (state) => !!state.category.id,
    },
  }
);
