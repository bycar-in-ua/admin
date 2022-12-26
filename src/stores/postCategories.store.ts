import { defineStore } from "pinia";
import { PostCategoryDto as PostCategory } from "@common/dto";
import apiClient, { post } from "@/helpers/apiClient";
import type { TreeOption } from "naive-ui";

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
    async updateParrent(targetCatId, parentId) {
      try {
        const targetCat = this.categories.find(
          (postCat) => postCat.id == targetCatId
        );
        await apiClient.post("/post-categories", {
          ...targetCat,
          parent: parentId,
        });

        await this.fetchPostCategories();
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getCategoriesTree(state): TreeOption[] {
      type PostCatToTree = PostCategory & { children?: PostCatToTree[] };
      // const convertPostCatToTree = (
      //   postCat: PostCatToTree
      // ): Omit<TreeOption, "children"> => ({
      //   key: postCat.id,
      //   label: postCat.title,
      //   children: postCat.children,
      // });

      const hashTable: PostCatToTree = Object.create(null);
      state.categories.forEach(
        (postCat) => (hashTable[postCat.id] = { ...postCat, children: [] })
      );
      const dataTree: TreeOption[] = [];
      state.categories.forEach((postCat) => {
        if (postCat.parent)
          hashTable[Number(postCat.parent)].children.push(
            hashTable[postCat.id]
          );
        else dataTree.push(hashTable[postCat.id]);
      });

      return dataTree;
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
  },
  getters: {
    isEdit: (state) => !!state.category.id,
  },
});
