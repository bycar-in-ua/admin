import { computed, ref } from "vue";
import { useRouter } from "vue-router";
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
    complectationId: availableVehicle.complectationId,
    powerUnitId: availableVehicle.powerUnitId,
    images: availableVehicle.images.map((image) => image.id),
  };
}

export const useAvailableVehicleEditorStore = defineStore(
  "availableVehicleEditor",
  () => {
    const router = useRouter();
    const availableVehicleService = useAvailableVehiclesService();

    const id = computed(() => Number(router.currentRoute.value.params.id));

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

    const { isPending: removePending, mutateAsync: removeAvailableVehicle } =
      useMutation({
        mutationKey: ["deleteAvailableVehicle", id],
        mutationFn: () =>
          availableVehicleService.removeAvailableVehicle(id.value),
        onSuccess: () => {
          router.push({ name: "AvailableVehicles" });
        },
      });

    return {
      car,
      carFetching,
      refetchCar,

      availableVehicleEditorState,

      saveAvailableVehicle,
      savingPending,

      removeAvailableVehicle,
      removePending,
    };
  }
);
