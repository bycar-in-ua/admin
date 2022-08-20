import { VehicleDto as Car } from "@common/dto";
import { PostStatus, BodyType } from "@common/enums";
import { defineStore } from "pinia";
import { useEditorStore } from "./editor.store";
import apiClient from "@/helpers/apiClient";

export const useVehicleStore = defineStore("vehicle", {
  state: (): { car: Car } => ({
    car: {
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
      brandId: undefined,
      brand: {
        displayName: "",
        slug: "",
        logo: "",
      },
    },
  }),
  actions: {
    async saveCar() {
      const editorStore = useEditorStore();
      try {
        editorStore.isFetching = true;
        const updatedCar = await apiClient.put(
          `/vehicles/${this.car.id}`,
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
        `/vehicles/${this.car.id}/${whatToSave}`,
        someIds
      );
      this[whatToSave] = savedItems;
    },

    async createComplectation(name: string) {
      try {
        const newComplectation = await apiClient.post("/complectations", {
          displayName: name,
          vehicleId: this.car.id,
        });
        this.car.complectations?.push(newComplectation);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteComplectation(complectationId) {
      await apiClient.delete(`/complectations/${complectationId}`);
      this.car.complectations = this.car.complectations?.filter(
        (complectation) => complectation.id !== complectationId
      );
    },
  },
  getters: {
    getVehicleTitle(state) {
      let title = "";

      title += state.car?.brand?.displayName + " ";

      title += state.car.model + " ";

      title += state.car.yearFrom + " ";

      if (state.car.yearTo) title += "- " + state.car.yearTo;

      return title;
    },
    carImagesIds(state) {
      return state.car.images?.map((image) => image.id);
    },
    enginesOptions(state) {
      return state.car.engines?.map((engine) => ({
        label: engine.displayName + ` ${engine.power} hp`,
        value: engine.id,
      }));
    },
    transmissionsOptions(state) {
      return (t) =>
        state.car.transmissions?.map((transmission) => ({
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

      for (const engine of state.car.engines) {
        engines.set(engine.id, engine);
      }

      return engines;
    },
    transmissionsMapById(state) {
      const transmissions = new Map();

      for (const transmission of state.car.transmissions) {
        transmissions.set(transmission.id, transmission);
      }

      return transmissions;
    },
    getCarBrandName(state) {
      return state.car.brand.slug || "";
    },
  },
});
