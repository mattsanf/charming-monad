import { JSONSchemaType } from "ajv/dist/2019";

export interface Item {
  planId: string;
  quantity:
    | number
    | {
        default?: number;
        minimum?: number;
        maximum?: number;
        multipleOf?: number;
      };
  thumbnail?: string;
}

export const itemsSchema: JSONSchemaType<Item[]> = {
  type: "array",
  items: {
    type: "object",
    oneOf: [
      {
        properties: {
          planId: { type: "string" },
          thumbnail: { type: "string" },
          quantity: { type: "number" },
        },
      },
      {
        properties: {
          planId: { type: "string" },
          thumbnail: { type: "string" },
          quantity: {
            type: "object",
            properties: {
              default: { type: "number" },
              minimum: { type: "number" },
              maximum: { type: "number" },
              multipleOf: { type: "number" },
            },
          },
        },
      },
    ],
    required: ["planId", "quantity"],
  },
  minItems: 1,
};
