import { CDN_URL } from "@/constants";

export type SupportedSize = "thumbnail" | "small" | "medium" | "large";

export const cdnLink = (src: string, size?: SupportedSize) => {
  const sizedSrc = size ? src.replace("images", size) : src;

  return `${CDN_URL}/${sizedSrc}`;
};
