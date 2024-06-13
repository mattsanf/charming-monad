import { JSONSchemaType } from "ajv/dist/2019";

export interface Payout {
  payoutRequestId: string;
}

export const payoutSchema: JSONSchemaType<Payout> = {
  type: "object",
  properties: {
    payoutRequestId: {
      type: "string",
    },
  },
  required: ["payoutRequestId"],
};
