import type { InjectionKey } from "vue";
import type { Image } from "@bycar-in-ua/sdk";

export const setImagesSelectableKey: InjectionKey<() => void> = Symbol(
  "setImagesSelectable"
);
export const setImagesUnselectableKey: InjectionKey<() => void> = Symbol(
  "setImagesUnselectable"
);

export const addImageToSelectionKey: InjectionKey<(image: Image) => void> =
  Symbol("addImageToSelection");
export const removeImageFromSelectionKey: InjectionKey<(image: Image) => void> =
  Symbol("removeImageFromSelection");
export const clearSelectionKey: InjectionKey<() => void> =
  Symbol("clearSelection");

export const cdnPathToSaveKey: InjectionKey<string> = Symbol("cdnPathToSave");
