import type { InjectionKey } from "vue";

export const setImagesSelectableKey: InjectionKey<() => void> = Symbol(
  "setImagesSelectable"
);
export const setImagesUnselectableKey: InjectionKey<() => void> = Symbol(
  "setImagesUnselectable"
);

export const addImageToSelectionKey: InjectionKey<(imageId: number) => void> =
  Symbol("addImageToSelection");
export const removeImageFromSelectionKey: InjectionKey<
  (imageId: number) => void
> = Symbol("removeImageFromSelection");

export const cdnPathToSaveKey: InjectionKey<string> = Symbol("cdnPathToSave");
