import { AvailableVehiclesPrivateService } from "@bycar-in-ua/sdk";
import { API_URL } from "@/constants";

let avlblService: AvailableVehiclesPrivateService;

export function useAvailableVehiclesService() {
  if (!avlblService) {
    avlblService = AvailableVehiclesPrivateService.create(API_URL);
  }

  return avlblService;
}
