import { JSONSchemaType } from "ajv/dist/2019";

export interface Money {
  amount: number;
  currency: string;
}

export const moneySchema: JSONSchemaType<Money> = {
  type: "object",
  properties: {
    amount: {
      type: "number",
    },
    currency: {
      type: "string",
      minLength: 3,
      maxLength: 3,
    },
  },
  required: ["amount", "currency"],
};
