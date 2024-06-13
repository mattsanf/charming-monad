import { JSONSchemaType } from "ajv/dist/2019";
import { optional } from "./utils";

// TODO: once schema is added for all translation keys, evade "object" typing
export interface I18n {
  [key: string]: {
    summary?: object;
    form?: object;
    confirmation?: object;
    result?: object;
    validations?: object;
    paymentMethods?: object;
  };
}

export const i18nSchema: JSONSchemaType<I18n> = {
  type: "object",
  patternProperties: {
    "^[a-z]{2}(-[A-Z]{2})?$": {
      type: "object",
      properties: {
        // TODO: Add schema for all translation keys
        summary: optional({ type: "object" }),
        form: optional({ type: "object" }),
        confirmation: optional({ type: "object" }),
        result: optional({ type: "object" }),
        validations: optional({ type: "object" }),
        paymentMethods: optional({ type: "object" }),
      },
      required: [],
    },
  },
  required: [],
};
