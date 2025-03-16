import { InjectionKey } from "vue";

export const saveAvailableVehicleHandlerKey: InjectionKey<() => Promise<void>> =
  Symbol("saveAvailableVehicle");
