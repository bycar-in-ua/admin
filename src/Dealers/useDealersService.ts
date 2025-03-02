import { ofetch } from "ofetch";
import { DealersService } from "@bycar-in-ua/sdk";
import { API_URL } from "@/constants";

let ds: DealersService | undefined;

export function useDealersService() {
  if (!ds) {
    ds = new DealersService(API_URL, ofetch);
  }

  return ds;
}
