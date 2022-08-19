import { defineStore } from "pinia";
import { useEditorStore } from "./editor.store";
import { useVehicleStore } from "./vehicle.store";
import apiClient from "@/helpers/apiClient";

export const useVehicleEditorStore = defineStore(
  "vehicle-editor-composed",
  () => {
    const editorStore = useEditorStore();
    const vehicle = useVehicleStore();

    vehicle.$subscribe(() => {
      editorStore.isModified = true;
    });

    async function fetchCar(carSlug: string) {
      try {
        editorStore.isFetching = true;
        const car = await apiClient.get(`/vehicles/${carSlug}/for-edit`);
        vehicle.$patch(car);
      } catch (e: unknown) {
        console.log(e);
      } finally {
        editorStore.isModified = false;
        editorStore.initiallyFetched = true;
        editorStore.isFetching = false;
      }
    }

    function purgeEditor() {
      vehicle.$dispose();
      editorStore.$dispose();
    }
    return {
      fetchCar,
      purgeEditor,
    };
  }
);
