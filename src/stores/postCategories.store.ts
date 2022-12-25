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
  loading: boolean;
}

export const usePostCategoryModalStore = defineStore("post-categories-modal", {
  state: (): PostCategoryModal => ({
    category: { id: undefined, title: "", slug: "", parent: undefined },
    isModalOpen: false,
    loading: false,
  }),
  actions: {
    async storePostCategory() {
      try {
        this.loading = true;
        await apiClient.post("/post-categories", this.category);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async updatePostCategory() {
      console.log("Updated");
    },
  },
  getters: {
    isEdit: (state) => !!state.category.id,
  },
});
