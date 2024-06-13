import { JSONSchemaType } from "ajv/dist/2019";
import { optional } from "./utils";

export interface PlanItem {
  planId: string;
  quantity: number;
  thumbnail?: string;
}

export const planItemsSchema: JSONSchemaType<PlanItem[]> = {
  type: "array",
  items: {
    type: "object",
    properties: {
      planId: { type: "string" },
      quantity: { type: "number" },
      thumbnail: optional({ type: "string" }),
    },
    required: ["planId", "quantity"],
  },
  default: [],
};
