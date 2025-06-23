import { defineStore } from "pinia";
import { BrandPrivateService, type Brand } from "@bycar-in-ua/sdk";
import { API_URL } from "@/constants";

interface State {
  brands: Brand[];
  isFetching: boolean;
  isEdit: boolean;
  isModalOpen: boolean;
  isFetched: boolean;
}

const brandsService = BrandPrivateService.create(API_URL);

export const useBrandsStore = defineStore("brands", {
  state: (): State => ({
    brands: [],
    isFetching: false,
    isEdit: false,
    isModalOpen: false,
    isFetched: false,
  }),
  actions: {
    async fetchBrands() {
      if (this.isFetched) {
        return;
      }

      this.brands = await brandsService.getBrands();
      this.isFetched = true;
    },
    async updateBrand() {
      try {
        this.isFetching = true;
        const brand = useBrandModalStore();

        const updatedBrand = await brandsService.updateBrand(
          brand.id,
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
        const newBrand = await brandsService.createBrand(brand.$state);
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
  state: (): Brand =>
    ({
      id: undefined,
      slug: "",
      displayName: "",
      logo: "",
      h1: "",
      metaTitle: "",
      metaDescription: "",
    }) as Brand,
});
