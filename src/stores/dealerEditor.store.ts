import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useQuery, useMutation } from "@tanstack/vue-query";
import type { Dealer, UpdateDealerPayload } from "@bycar-in-ua/sdk";
import { useDealersService } from "@/Dealers";

function dealerToDealerPayload(dealer: Dealer): UpdateDealerPayload {
  return {
    name: dealer.name,
    location: dealer.location,
    brands: dealer.brands.map((brand) => brand.id),
  };
}

export const useDealerEditorStore = defineStore("dealerEditor", () => {
  const router = useRouter();
  const dealersService = useDealersService();

  const id = computed(() => Number(router.currentRoute.value.params.id));

  const dealerEditorState = ref<UpdateDealerPayload>({});

  const {
    data: dealer,
    isFetching: dealerFetching,
    refetch: refetchDealer,
  } = useQuery({
    queryKey: ["dealer", id],
    queryFn: async () => {
      if (!id.value) {
        return null;
      }

      const dealer = await dealersService.getDealer(id.value);

      dealerEditorState.value = dealerToDealerPayload(dealer);

      return dealer;
    },
    enabled: !!id.value,
  });

  const { isPending: pendingUpdateDealer, mutateAsync: updateDealer } =
    useMutation({
      mutationKey: ["update-dealer", id],
      mutationFn: () =>
        dealersService.updateDealer(id.value, dealerEditorState.value),
      onSuccess() {
        refetchDealer();
      },
    });

  const { isPending: deletePending, mutateAsync: deleteDealer } = useMutation({
    mutationKey: ["delete-dealer", id],
    mutationFn: () => {
      return dealersService.removeDealer(id.value);
    },
    onSuccess() {
      router.push({ name: "Dealers" });
    },
  });

  return {
    dealerEditorState,

    dealer,
    dealerFetching,

    updateDealer,
    pendingUpdateDealer,

    deleteDealer,
    deletePending,
  };
});
