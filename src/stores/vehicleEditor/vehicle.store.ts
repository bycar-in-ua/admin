import { defineStore } from "pinia";
import { PostStatus, BodyType } from "@bycar-in-ua/sdk";
import type { Vehicle, Image, VehicleImage } from "@bycar-in-ua/sdk";
import { n8nService } from "@/services/n8n.service";
import { isNil, omitBy } from "lodash";
import { getTransmissionDisplayName } from "@/helpers/transmission.helpers";
import { useVehiclesService } from "@/composables/useVehiclesService";
import { useComplectationsService } from "@/composables/useComplectationsService";
import { useEditorStore } from "./editor.store";

const vehiclesService = useVehiclesService();
const complectationsService = useComplectationsService();

export const useVehicleStore = defineStore("vehicle", {
  state: (): { car: Vehicle } => ({
    car: {
      id: undefined,
      status: PostStatus.DRAFT,
      slug: "",
      h1: "",
      metaTitle: "",
      metaDescription: "",
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
      description: "",
    } as Vehicle,
  }),
  actions: {
    async saveCar() {
      const editorStore = useEditorStore();
      try {
        editorStore.isFetching = true;
        const updatedCar = await vehiclesService.updateVehicle(
          this.car.id,
          this.car
        );
        this.car = updatedCar;
        editorStore.isModified = false;
      } catch (error: unknown) {
        console.log(error);

        throw error;
      } finally {
        editorStore.isFetching = false;
      }
    },

    async saveSomething(
      someIds: Array<number>,
      whatToSave: "images" | "colors"
    ) {
      /**
       * TODO: rework it to 2 handlers
       */
      const savedItems = await vehiclesService.client.put<Array<never>>(
        `/vehicles/${this.car.id}/${whatToSave}`,
        {
          body: someIds,
        }
      );

      this.car[whatToSave] = savedItems;
    },

    async createComplectation(name: string) {
      try {
        const newComplectation =
          await complectationsService.createComplectation({
            displayName: name,
            vehicleId: this.car.id,
            base: false,
          });
        this.car.complectations.push(newComplectation);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteComplectation(complectationId) {
      await complectationsService.deleteComplectation(complectationId);

      this.car.complectations = this.car.complectations.filter(
        (complectation) => complectation.id !== complectationId
      );
    },

    handleSelectedImages(selectedImages: Image[]) {
      const images: VehicleImage[] = selectedImages.map((selectedImage) => {
        const existedImage = this.car.images.find(
          (image) => image.imageId === selectedImage.id
        );

        return (
          existedImage ||
          ({
            imageId: selectedImage.id,
            vehicleId: this.car.id,
            image: selectedImage,
          } as VehicleImage)
        );
      });

      this.car.images = images;
    },
    async generateDescription() {
      const body = {
        model: `${this.car.brand.displayName} ${this.car.model} ${this.car.yearFrom}`,
        complectations: this.car.complectations,
        engines: this.car.engines,
      };

      const response = await n8nService.generateDescriptionData(body);

      this.car.description = response.output;
    },
    async generateSEO() {
      const response = await n8nService.generateSEOData(
        `${this.car.brand.displayName} ${this.car.model} ${this.car.yearFrom}`
      );

      this.car.h1 = response.h1;
      this.car.metaTitle = response.metaTitle;
      this.car.metaDescription = response.metaDescription;
    },
    async generateGeneralInfo() {
      const response = await n8nService.generateVehicleInfo({
        part: "general-info",
        carName: `${this.car.brand.displayName} ${this.car.model} ${this.car.yearFrom}`,
        slug: this.car.slug,
      });

      const sanitizedResponse = omitBy(response, isNil);

      this.car = {
        ...this.car,
        ...sanitizedResponse,
      };
    },
    async generateEngines() {
      if (this.car.engines.length > 0) {
        return;
      }

      const response = await n8nService.generateVehicleInfo({
        part: "engines",
        carName: `${this.car.brand.displayName} ${this.car.model} ${this.car.yearFrom}`,
        slug: this.car.slug,
      });

      this.car.engines = response.engines;
    },
    async generateTransmissions() {
      if (this.car.transmissions.length > 0) {
        return;
      }

      const response = await n8nService.generateVehicleInfo({
        part: "transmissions",
        carName: `${this.car.brand.displayName} ${this.car.model} ${this.car.yearFrom}`,
        slug: this.car.slug,
      });

      this.car.transmissions = response.transmissions;
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
    enginesOptions(state) {
      return state.car.engines?.map((engine) => ({
        label: `${engine.tradename ?? ""} ${engine.displacement ?? ""} ${
          engine.injection ?? ""
        } ${engine.power} hp`,
        value: engine.id,
      }));
    },
    transmissionsOptions(state) {
      return (t) =>
        state.car.transmissions?.map((transmission) => ({
          label: getTransmissionDisplayName(transmission, t),
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
