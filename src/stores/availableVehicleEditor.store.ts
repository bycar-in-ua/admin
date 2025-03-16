import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import type {
  AvailableVehicle,
  AvailableVehicleImage,
  UpdateAvailableVehiclePayload,
  Image,
} from "@bycar-in-ua/sdk";
import { useAvailableVehiclesService } from "@/AvailableVehicles";

function availableVehicleToUpdatePayload(
  availableVehicle: AvailableVehicle
): UpdateAvailableVehiclePayload {
  const sortedImages = availableVehicle.images.sort(
    (a, b) =>
      (a?.order ?? Number.MAX_SAFE_INTEGER) -
      (b?.order ?? Number.MAX_SAFE_INTEGER)
  );

  return {
    dealerId: availableVehicle.dealerId,
    status: availableVehicle.status,
    price: availableVehicle.price,
    complectationId: availableVehicle.complectationId,
    powerUnitId: availableVehicle.powerUnitId,
    images: sortedImages,
    mileage: availableVehicle.mileage,
    h1: availableVehicle.h1,
    metaTitle: availableVehicle.metaTitle,
    metaDescription: availableVehicle.metaDescription,
  };
}

export const useAvailableVehicleEditorStore = defineStore(
  "availableVehicleEditor",
  () => {
    const router = useRouter();
    const availableVehicleService = useAvailableVehiclesService();

    const id = computed(() => Number(router.currentRoute.value.params.id));

    const editor = ref<UpdateAvailableVehiclePayload>({});

    const queryClient = useQueryClient();

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

        editor.value = availableVehicleToUpdatePayload(av);

        return av;
      },
      enabled: !!id.value,
    });

    const { isPending: savingPending, mutateAsync: saveAvailableVehicle } =
      useMutation({
        mutationKey: ["updateAvailableVehicle", id],
        mutationFn: () => {
          return availableVehicleService.updateAvailableVehicle(
            id.value,
            editor.value
          );
        },
        onSuccess: (availableVehicle) => {
          editor.value = availableVehicleToUpdatePayload(availableVehicle);
          queryClient.setQueryData(["availableVehicle", id], availableVehicle);
        },
        onError: (error, _, ctx) => {
          console.error(error);

          console.log(ctx, _);
        },
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

    function handleSelectedImages(selectedImages: Image[]) {
      const images: AvailableVehicleImage[] = selectedImages.map(
        (selectedImage) => {
          const existedImage = car.value.images.find(
            (image) => image.imageId === selectedImage.id
          );

          return (
            existedImage ||
            ({
              imageId: selectedImage.id,
              availableVehicleId: id.value,
              image: selectedImage,
            } as AvailableVehicleImage)
          );
        }
      );

      editor.value.images = images;
    }

    return {
      car,
      carFetching,
      refetchCar,

      editor,
      handleSelectedImages,

      saveAvailableVehicle,
      savingPending,

      removeAvailableVehicle,
      removePending,
    };
  }
);
