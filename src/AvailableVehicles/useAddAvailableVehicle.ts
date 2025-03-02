import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Composer, useI18n } from "vue-i18n";
import { useQuery, useMutation } from "@tanstack/vue-query";
import { Vehicle, PowerUnit } from "@bycar-in-ua/sdk";
import { useDealersService } from "@/Dealers";
import apiClient from "@/helpers/apiClient";
import { getEngineLabel } from "@/helpers/engine.helpers";
import { useBrandsStore } from "@/stores/brands.store";
import { useCarsStore } from "@/stores/cars.store";
import { useAvailableVehiclesService } from "./useAvailableVehiclesService";

type FormModel = {
  brandId: number | null;
  dealerId: number | null;
  vehicleId: number | null;
  complectationId: number | null;
  powerUnitId: number | null;
  price: number | null;
};

/**
 * @deprecated Should be used from UI lib
 */
const getPowerUnitName = (powerUnit: PowerUnit, t: Composer["t"]) => {
  const transmission = powerUnit.transmission;

  const titleParts = [getEngineLabel(powerUnit.engine)];

  if (transmission) {
    titleParts.push(
      [
        transmission.drive,
        transmission.gearbox.numberOfGears,
        t("vehicle.transmission.gearbox.types." + transmission?.gearbox?.type),
      ]
        .filter(Boolean)
        .join(" ")
    );
  }

  if (powerUnit.price) {
    titleParts.push(`($${powerUnit.price.toLocaleString()})`);
  }

  return titleParts.join(" ");
};

export function useAddAvailableVehicle() {
  const { t } = useI18n();

  const brandsStore = useBrandsStore();
  brandsStore.fetchBrands();
  const brands = computed(() => brandsStore.brands);
  const brandsFetching = computed(() => brandsStore.isFetching);

  const carsStore = useCarsStore();
  const cars = computed(() => carsStore.items);
  const carsFetching = computed(() => carsStore.isFetching);

  const formState = ref<FormModel>({
    brandId: null,
    dealerId: null,
    vehicleId: null,
    complectationId: null,
    powerUnitId: null,
    price: null,
  });

  const dealersService = useDealersService();

  const {
    data: dealers,
    isFetching: dealersFetching,
    refetch: fetchDealers,
  } = useQuery({
    queryKey: ["dealers"],
    queryFn: async () => {
      const response = await dealersService.searchDealers({
        filters: { brands: [formState.value.brandId] },
      });

      return response?.items ?? [];
    },
    enabled: false,
  });

  const {
    data: car,
    isFetching: carFetching,
    refetch: fetchCar,
  } = useQuery({
    queryKey: ["car"],
    queryFn: () => {
      if (!formState.value.vehicleId) {
        return null;
      }

      const chosenCar = carsStore.items.find(
        (car) => car.id === formState.value.vehicleId
      );

      return apiClient.get(`/vehicles/${chosenCar.slug}`) as Promise<Vehicle>;
    },
    enabled: false,
  });

  function onComplectationUpdate() {
    formState.value.powerUnitId = null;
    formState.value.price = null;
  }

  async function onVehicleUpdate() {
    formState.value.complectationId = null;
    onComplectationUpdate();
    const { data: car } = await fetchCar();

    if (car.complectations.length === 1) {
      const complectation = car.complectations[0];
      formState.value.complectationId = complectation.id;

      if (complectation.powerUnits.length === 1) {
        formState.value.powerUnitId = complectation.powerUnits[0].id;
      }
    }
  }

  function onBrandUpdate() {
    formState.value.vehicleId = null;
    formState.value.dealerId = null;
    onVehicleUpdate();

    carsStore.meta.itemsPerPage = 100;

    if (formState.value.brandId) {
      carsStore.filters.brand = [formState.value.brandId];

      fetchDealers();
      carsStore.fetchCars();
    }
  }

  const complectations = computed(() => {
    if (!car.value) {
      return [];
    }

    return car.value.complectations;
  });

  const powerUnits = computed(() => {
    const complectation = complectations.value?.find(
      (complectation) => complectation.id === formState.value.complectationId
    );

    if (!complectation) {
      return [];
    }

    return complectation.powerUnits.map((pu) => ({
      id: pu.id,
      displayName: getPowerUnitName(pu, t),
    }));
  });

  const availableVehicleService = useAvailableVehiclesService();
  const router = useRouter();

  const {
    mutate: createAvailableVehicle,
    isPending: createAvailableVehiclePending,
  } = useMutation({
    mutationKey: ["addAvailableVehicle"],
    mutationFn: () =>
      availableVehicleService.createAvailableVehicle({
        vehicleId: formState.value.vehicleId!,
        dealerId: formState.value.dealerId!,
        complectationId: formState.value.complectationId!,
        powerUnitId: formState.value.powerUnitId!,
        price: formState.value.price!,
      }),
    onSuccess: (av) => {
      router.push({ name: "EditAvailableVehicle", params: { id: av.id } });
    },
  });

  return {
    formState,

    brands,
    brandsFetching,
    onBrandUpdate,

    dealers,
    dealersFetching,

    cars,
    carsFetching,
    onVehicleUpdate,

    carFetching,

    complectations,
    onComplectationUpdate,

    powerUnits,

    createAvailableVehicle,
    createAvailableVehiclePending,
  };
}
