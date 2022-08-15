import { defineStore } from "pinia";

interface State {
  items: [];
  page: number;
  pageCount: null;
  pageSize: null;
  totalItems: null;
  isFetching: false;
}

export const useCarsStore = defineStore("cars", {});
