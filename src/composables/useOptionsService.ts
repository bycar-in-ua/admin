import { OptionsPrivateService } from "@bycar-in-ua/sdk";
import { API_URL } from "@/constants";

let optionsService: OptionsPrivateService;

export function useOptionsService() {
  if (!optionsService) {
    optionsService = OptionsPrivateService.create(API_URL);
  }

  return optionsService;
}
