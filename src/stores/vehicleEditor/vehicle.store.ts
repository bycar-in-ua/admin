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

    async createComplectation(name: string) {
      try {
        const newComplectation = await apiClient.post("/complectations", {
          displayName: name,
          vehicleId: this.id,
        });
        this.complectations?.push(newComplectation);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteComplectation(complectationId) {
      await apiClient.delete(`/complectations/${complectationId}`);
      this.complectations = this.complectations?.filter(
        (complectation) => complectation.id !== complectationId
      );
    },
  },
  getters: {
    getVehicleTitle(state) {
      let title = "";

      title += state?.brand?.displayName + " ";

      title += state.model + " ";

      title += state.yearFrom + " ";

      if (state.yearTo) title += "- " + state.yearTo;

      return title;
    },
    carImagesIds(state) {
      return state.images?.map((image) => image.id);
    },
    enginesOptions(state) {
      return state.engines?.map((engine) => ({
        label: engine.displayName + ` ${engine.power} hp`,
        value: engine.id,
      }));
    },
    transmissionsOptions(state) {
      return (t) =>
        state.transmissions?.map((transmission) => ({
          label: `${transmission.drive} - ${
            transmission?.gearbox?.numberOfGears
          } ${t(
            "vehicle.transmission.gearbox.types." + transmission?.gearbox?.type
          )}`,
          value: transmission.id,
        }));
    },
    enginesMapById(state) {
      const engines = new Map();

      for (const engine of state?.engines || []) {
        engines.set(engine.id, engine);
      }

      return engines;
    },
    transmissionsMapById(state) {
      const transmissions = new Map();

      for (const transmission of state?.transmissions || []) {
        transmissions.set(transmission.id, transmission);
      }

      return transmissions;
    },
    getCarBrandName(state) {
      return state?.brand?.slug || "";
    },
  },
});
