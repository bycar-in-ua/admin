import { Engine } from "@bycar-in-ua/sdk";

export function getEngineDisplacementLabel(displacement?: number) {
  return displacement ? (Math.round(displacement / 100) / 10).toFixed(1) : "";
}

export function getEngineLabel(engine?: Engine) {
  if (!engine) {
    return "";
  }

  const displacement = getEngineDisplacementLabel(engine.displacement);

  return `${displacement} ${engine.tradename ?? ""}`;
}
