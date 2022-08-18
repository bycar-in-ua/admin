import { defineStore } from "pinia";
import { BrandDto as Brand } from "@common/dto";
import apiClient from "@/helpers/apiClient";

interface State {
  brands: Brand[];
  isFetching: boolean;
  isEdit: boolean;
  isModalOpen: boolean;
}

export const useBrandsStore = defineStore("brands", {
  state: (): State => ({
    brands: [],
    isFetching: false,
    isEdit: false,
    isModalOpen: false,
  }),
  actions: {
    async fetchBrands() {
      try {
        const brands = await apiClient.get("/brands");
        this.brands = brands;
      } catch (e: unknown) {
        console.log(e);
      }
    },
    async updateBrand() {
      try {
        this.isFetching = true;
        const brand = useBrandModalStore();
        const updatedBrand = await apiClient.put(
          `/brands/${brand.id}`,
          brand.$state
        );
        this.brands = this.brands.map((brand) => {
          if (brand.id == updatedBrand.id) {
            return updatedBrand;
          }
          return brand;
        });
        this.isFetching = false;
        this.isModalOpen = false;
      } catch (error) {
        console.log(error);
        this.isFetching = false;
      }
    },
    async createBrand() {
      try {
        this.isFetching = true;
        const brand = useBrandModalStore();
        const newBrand = await apiClient.post("/brands", brand.$state);
        this.brands.push(newBrand);
        this.isFetching = false;
        this.isModalOpen = false;
      } catch (error) {
        console.log(error);
        this.isFetching = false;
      }
    },
  },
});

export const useBrandModalStore = defineStore("brand-modal", {
  state: (): Brand => ({
    id: undefined,
    slug: "",
    displayName: "",
    logo: "",
  }),
});
