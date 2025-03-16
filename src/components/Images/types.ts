import { Image } from "@bycar-in-ua/sdk";
import { Component } from "vue";

export type ToolbarAction = {
  component: Component;
  clickCallback: (selectedImages: Image[]) => void | Promise<void>;
};
