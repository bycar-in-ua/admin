import { VehicleDto as Car } from "@common/dto";
import { PostStatus, BodyType } from "@common/enums";
import { defineStore } from "pinia";
import { useEditorStore } from "./editor.store";
import apiClient from "@/helpers/apiClient";

export const useVehicleStore = defineStore("vehicle", {
  state: (): Car => ({
    id: undefined,
    status: PostStatus.DRAFT,
    slug: "",
    model: "",
    yearFrom: 0,
    bodyType: BodyType.sedan,
    engines: [],
    transmissions: [],
    complectations: [],
    images: [],
    colors: [],
    brand: {
      displayName: "",
      slug: "",
      logo: "",
    },
  }),
  actions: {
    async saveCar() {
      const editorStore = useEditorStore();
      try {
        editorStore.isFetching = true;
        const updatedCar = await apiClient.put(
          `/vehicles/${this.id}`,
          this.$state
        );
        this.$patch(updatedCar);
        editorStore.isModified = false;
      } catch (e: unknown) {
        console.log(e);
      } finally {
        editorStore.isFetching = false;
      }
    },

    async saveSomething(
      someIds: Array<number>,
      whatToSave: "images" | "colors"
    ) {
      const savedItems = await apiClient.put(
        `/vehicles/${this.id}/${whatToSave}`,
        someIds
      );
      this[whatToSave] = savedItems;
    },

    async deleteComplectation(complectationId) {
      await apiClient.delete(`/complectations/${complectationId}`);
      this.complectations = this.complectations?.filter(
        (complectation) => complectation.id !== complectationId
      );
    },
  },
  getters: {
    getVehicleTitle() {
      let title = "";

      title += this?.brand?.displayName + " ";

      title += this.model + " ";

      title += this.yearFrom + " ";

      if (this.yearTo) title += "- " + this.yearTo;

      return title;
    },
  },
});
