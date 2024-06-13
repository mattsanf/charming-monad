import { JSONSchemaType } from "ajv/dist/2019";
import { optional } from "./utils";

export interface Features {
  enableTelemetry?: boolean;
  hideConfirmation?: boolean;
  hideResult?: boolean;
  fullPageRedirect?: boolean;
  showCoupons?: string[];
  hideContinue?: boolean;
}

export const featuresSchema: JSONSchemaType<Features> = {
  type: "object",
  properties: {
    enableTelemetry: optional({
      type: "boolean",
      default: true,
    }),
    hideConfirmation: optional({
      type: "boolean",
      default: false,
    }),
    hideResult: optional({
      type: "boolean",
      default: false,
    }),
    fullPageRedirect: optional({
      type: "boolean",
      default: false,
    }),
    showCoupons: optional({
      type: "array",
      items: {
        type: "string",
        enum: ["summary", "confirmation"],
      },
    }),
    hideContinue: optional({
      type: "boolean",
      default: false,
    }),
  },
  default: {},
};
