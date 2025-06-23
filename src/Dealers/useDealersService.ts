import { DealersPrivateService } from "@bycar-in-ua/sdk";
import { API_URL } from "@/constants";

let dealersService: DealersPrivateService;

export function useDealersService() {
  if (!dealersService) {
    dealersService = DealersPrivateService.create(API_URL);
  }

  return dealersService;
}
