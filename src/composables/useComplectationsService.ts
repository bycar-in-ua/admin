import { ComplectationsPrivateService } from "@bycar-in-ua/sdk";
import { API_URL } from "@/constants";

let complectationsService: ComplectationsPrivateService;

export function useComplectationsService() {
  if (!complectationsService) {
    complectationsService = ComplectationsPrivateService.create(API_URL);
  }

  return complectationsService;
}
