import { CDN_URL } from "@/constants";

export const cdnLink = (path, width = 0, height = 0) => {
  let url = CDN_URL + "/";

  if (width && height) {
    url += `fit-in/${width}x${height}/`;
  }

  return (url += path);
};
