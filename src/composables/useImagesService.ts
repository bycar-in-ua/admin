import {
  ImagesPrivateService,
  getBycarAuthenticatedFetchClient,
} from "@bycar-in-ua/sdk";
import { API_URL } from "@/constants";

class AdminImagesService extends ImagesPrivateService {
  public uploadImagesWithPath(files: File[], path: string = "") {
    const formData = new FormData();

    for (const file of files) {
      formData.append(file.name, file);
    }

    formData.append("path", path);

    return this.uploadImages(formData);
  }
}

let imagesService: AdminImagesService;

export function useImagesService() {
  if (!imagesService) {
    imagesService = new AdminImagesService(
      getBycarAuthenticatedFetchClient(API_URL)
    );
  }

  return imagesService;
}
