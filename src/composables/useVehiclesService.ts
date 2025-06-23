import { VehiclePrivateService } from "@bycar-in-ua/sdk";
import { API_URL } from "@/constants";

let vehiclesService: VehiclePrivateService;

export function useVehiclesService() {
  if (!vehiclesService) {
    vehiclesService = VehiclePrivateService.create(API_URL);
  }

  return vehiclesService;
}
