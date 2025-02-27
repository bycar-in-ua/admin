import { ofetch } from "ofetch";
import { AvailableVehiclesService } from "@bycar-in-ua/sdk";
import { API_URL } from "@/constants";

let avlblService: AvailableVehiclesService | undefined;

export function useAvailableVehiclesService() {
  if (!avlblService) {
    avlblService = new AvailableVehiclesService(API_URL, ofetch);
  }

  return avlblService;
}
