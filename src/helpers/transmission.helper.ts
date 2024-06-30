import { TransmissionDto as Transmission } from "@bycar-in-ua/common";
import { ComposerTranslation } from "vue-i18n";

export function getTransmissionDisplayName(
  transmission: Transmission,
  t: ComposerTranslation
) {
  let displayName = "";

  displayName += String(transmission.drive);

  displayName += " " + String(transmission.driveName || "");
  displayName += " - " + String(transmission.gearbox.numberOfGears);
  displayName +=
    " " + t("vehicle.transmission.gearbox.types." + transmission.gearbox.type);
  console.log("transmission.gearbox.type", transmission.gearbox.type);

  return displayName;
}
