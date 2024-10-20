import { defineStore } from "pinia";
import type { Vehicle, PaginationMeta } from "@bycar-in-ua/sdk";
import apiClient from "@/helpers/apiClient.js";

interface State {
  items: Vehicle[];
  meta: PaginationMeta;
  filters: {
    status?: string[];
    brand?: number[];
  };
  isFetching: boolean;
}

export const useCarsStore = defineStore("cars", {
  state: (): State => ({
    items: [],
    meta: {
      currentPage: 1,
      totalPages: undefined,
      itemsPerPage: 10,
      totalItems: undefined,
    },
    filters: {},
    isFetching: false,
  }),
  actions: {
    async fetchCars(page = 1) {
      try {
        this.isFetching = true;

        const cars = await apiClient.post(`/vehicles/search/all`, {
          ...this.filters,
          page,
          limit: this.meta.itemsPerPage,
        });

        this.items = cars.items;
        this.meta = cars.meta;
      } catch (e) {
        throw Error();
      } finally {
        this.isFetching = false;
      }
    },
    setFilters(filters: State["filters"]) {
      this.filters = filters;
      this.fetchCars(1);
    },
    async duplicateCar(targetCarId: number) {
      try {
        this.isFetching = true;
        return await apiClient.post(`/vehicles/duplicate/${targetCarId}`, {});
      } catch (e) {
        throw Error();
      } finally {
        this.isFetching = false;
      }
    },
    async deleteCars(type: "soft" | "hard", carsIds: number[]) {
      try {
        this.isFetching = true;
        await apiClient.delete(`/vehicles/${type}`, carsIds);
        await this.fetchCars(1);
      } catch (e) {
        throw Error();
      } finally {
        this.isFetching = false;
      }
    },
  },
});
