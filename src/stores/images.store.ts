import { defineStore } from "pinia";
import { ImageDto as Image } from "@common/dto";
import { PaginationMeta } from "@common/types";
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
        const images = await get(`/images/${page}`);
        this.images = images.items;
        this.meta = images.meta;
      } finally {
        this.isFetching = false;
      }
    },
  },
});
