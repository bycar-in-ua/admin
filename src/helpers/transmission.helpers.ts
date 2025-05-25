import type { Transmission } from "@bycar-in-ua/sdk";
import { ComposerTranslation } from "vue-i18n";

export function getTransmissionDisplayName(
  transmission: Transmission,
  t: ComposerTranslation
) {
  return [
    [transmission.drive, transmission.driveName].filter(Boolean).join(" "),
    [
      transmission.gearbox.numberOfGears,
      t("vehicle.transmission.gearbox.types." + transmission.gearbox.type),
    ]
      .filter(Boolean)
      .join(" "),
  ]
    .filter(Boolean)
    .join(" - ");
}
