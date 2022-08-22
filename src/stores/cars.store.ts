import { defineStore } from "pinia";
import { VehicleDto as Car } from "@common/dto";
import { PaginationMeta } from "@common/types";
import apiClient from "@/helpers/apiClient.js";

interface State {
  items: Car[];
  meta: PaginationMeta;
  isFetching: boolean;
}

export const useCarsStore = defineStore("cars", {
  state: (): State => ({
    items: [],
    meta: {
      currentPage: 1,
      totalPages: undefined,
      itemsPerPage: undefined,
      totalItems: undefined,
    },
    isFetching: false,
  }),
  actions: {
    async fetchCars(page = 1) {
      try {
        this.isFetching = true;
        const cars = await apiClient.get(`/vehicles/all?page=${page}`);
        this.items = cars.items;
        this.meta = cars.meta;
      } catch (e) {
        throw Error();
      } finally {
        this.isFetching = false;
      }
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
