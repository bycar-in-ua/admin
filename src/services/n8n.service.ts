import { ofetch } from "ofetch";
import { N8N_URL } from "@/constants";

const n8nClient = ofetch.create({
  baseURL: N8N_URL,
});

class N8NService {
  public generateSEOData(model: string) {
    return n8nClient<SEOResponse>("/webhook/seo-generation", {
      method: "POST",
      body: {
        model,
      },
    });
  }
}

export const n8nService = new N8NService();

type SEOResponse = {
  h1: string;
  metaTitle: string;
  metaDescription: string;
};
