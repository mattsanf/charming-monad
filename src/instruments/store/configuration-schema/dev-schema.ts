import { JSONSchemaType } from "ajv/dist/2019";
import { optional } from "./utils";

export interface DevProperties {
  paymentMethodsUrl?: string;
  liveUrl?: string;
  sandboxUrl?: string;
  framePayScriptLink?: string;
  framePayStyleLink?: string;
}

export const devSchema: JSONSchemaType<DevProperties> = {
  type: "object",
  properties: {
    paymentMethodsUrl: optional({
      type: "string",
      default: "https://forms.local.rebilly.dev:3000",
    }),
    liveUrl: optional({ type: "string" }),
    sandboxUrl: optional({ type: "string" }),
    framePayScriptLink: optional({ type: "string" }),
    framePayStyleLink: optional({ type: "string" }),
  },
};
