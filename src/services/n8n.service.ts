import { ofetch } from "ofetch";
import {
  Complectation,
  Vehicle,
  getCookie,
  ACCESS_TOKEN_COOKIE_NAME,
} from "@bycar-in-ua/sdk";
import { N8N_URL } from "@/constants";
import { getLlmName } from "@/composables/useLlm";

const n8nClient = ofetch.create({
  baseURL: `${N8N_URL}/webhook`,
});

class N8NService {
  get llm() {
    return getLlmName();
  }

  public generateSEOData(model: string) {
    return n8nClient<SEOResponse>("seo-generation", {
      method: "POST",
      body: {
        llm: this.llm,
        model,
      },
    });
  }

  public generateVehicleInfo(body: GeneralInfoPayload) {
    return n8nClient<Partial<Vehicle>>("generate-vehicle-info", {
      method: "POST",
      body: {
        ...body,
        llm: this.llm,
      },
    });
  }

  public generateComplectation(body: GenerateComplectationPayload) {
    return n8nClient<Partial<Complectation>>("generate-vehicle-info", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getCookie(ACCESS_TOKEN_COOKIE_NAME)}`,
      },
      body: {
        ...body,
        llm: this.llm,
        part: "complectation",
      },
      timeout: 5 * 60 * 1000,
    });
  }
}

export const n8nService = new N8NService();

type SEOResponse = {
  h1: string;
  metaTitle: string;
  metaDescription: string;
};

type GenerationParts = "general-info" | "engines" | "transmissions";

type GeneralInfoPayload = {
  part: GenerationParts;
  carName: string;
  slug: string;
};

type IdName = {
  id: number;
  name: string;
};

export type GenerateComplectationPayload = Pick<
  GeneralInfoPayload,
  "carName" | "slug"
> & {
  complectationName: string;
  engines: IdName[];
  transmissions: IdName[];
};
