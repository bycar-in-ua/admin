import { defineStore } from "pinia";
import { useEditorStore } from "./editor.store";
import { useVehicleStore } from "./vehicle.store";
import type { Vehicle } from "@bycar-in-ua/sdk";
import { useVehiclesService } from "@/composables/useVehiclesService";

const vehiclesService = useVehiclesService();

export const useVehicleEditorStore = defineStore(
  "vehicle-editor-composed",
  () => {
    const editorStore = useEditorStore();
    const vehicle = useVehicleStore();

    async function fetchCar(carSlug: string) {
      try {
        editorStore.isFetching = true;
        const car: Vehicle = await vehiclesService.getVehicleForEdit(carSlug);
        vehicle.$state.car = car;
      } finally {
        editorStore.isModified = false;
        editorStore.initiallyFetched = true;
        editorStore.isFetching = false;
      }
    }

    function purgeEditor() {
      vehicle.$reset();
      editorStore.$reset();
      vehicle.$dispose();
      editorStore.$dispose();
    }
    return {
      fetchCar,
      purgeEditor,
    };
  }
);
