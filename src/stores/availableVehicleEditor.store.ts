import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { defineStore } from "pinia";
import { useQuery, useMutation } from "@tanstack/vue-query";
import type {
  AvailableVehicle,
  UpdateAvailableVehiclePayload,
} from "@bycar-in-ua/sdk";
import { useAvailableVehiclesService } from "@/AvailableVehicles";

function availableVehicleToUpdatePayload(
  availableVehicle: AvailableVehicle
): UpdateAvailableVehiclePayload {
  return {
    dealerId: availableVehicle.dealerId,
    status: availableVehicle.status,
    price: availableVehicle.price,
    images: availableVehicle.images.map((image) => image.id),
  };
}

export const useAvailableVehicleEditorStore = defineStore(
  "availableVehicleEditor",
  () => {
    const route = useRoute();
    const availableVehicleService = useAvailableVehiclesService();

    const id = computed(() => Number(route.params.id));

    const availableVehicleEditorState = ref<UpdateAvailableVehiclePayload>({});

    const {
      data: car,
      isFetching: carFetching,
      refetch: refetchCar,
    } = useQuery({
      queryKey: ["availableVehicle", id],
      queryFn: async () => {
        if (!id.value) {
          return null;
        }

        const av = await availableVehicleService.getAvailableVehicle(id.value);

        availableVehicleEditorState.value = availableVehicleToUpdatePayload(av);

        return av;
      },
      enabled: !!id.value,
    });

    const { isPending: savingPending, mutateAsync: saveAvailableVehicle } =
      useMutation({
        mutationKey: ["updateAvailableVehicle", id],
        mutationFn: async () => {
          const response = await availableVehicleService.updateAvailableVehicle(
            id.value,
            availableVehicleEditorState.value
          );

          availableVehicleEditorState.value =
            availableVehicleToUpdatePayload(response);
        },
        onSuccess: () => refetchCar(),
      });

    return {
      car,
      carFetching,
      refetchCar,

      availableVehicleEditorState,

      saveAvailableVehicle,
      savingPending,
    };
  }
);
