import { CDN_URL } from "@/constants";

export const cdnLink = (path, width = 0, height = 0) =>
  `${CDN_URL}/${path}?size=${width}x${height}`;
