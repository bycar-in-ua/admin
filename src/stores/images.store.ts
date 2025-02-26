import { defineStore } from "pinia";
import type { PaginationMeta, Image } from "@bycar-in-ua/sdk";
import { get } from "@/helpers/apiClient";

interface State {
  images: Image[];
  meta: PaginationMeta;
  isFetching: boolean;
}

export const useImagesStore = defineStore("images", {
  state: (): State => ({
    images: [],
    meta: {
      currentPage: 1,
      totalItems: undefined,
      totalPages: undefined,
      itemsPerPage: undefined,
    },
    isFetching: false,
  }),
  actions: {
    async fetchImages(page = 1) {
      try {
        this.isFetching = true;
        const images = await get(`/images?page=${page}`);
        this.images = images.items;
        this.meta = images.meta;
      } finally {
        this.isFetching = false;
      }
    },
  },
});
