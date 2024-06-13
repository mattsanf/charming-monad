import { JSONSchemaType } from "ajv/dist/2019";
import { optional } from "./utils";

interface DepositObject {
  currency: string;
  amount?: number;
  buttons?: number[];
  editable?: boolean;
  customAmount?: {
    minimum?: number;
    maximum?: number;
    multipleOf?: number;
  };
}

interface DepositRequest {
  depositRequestId: string;
}

export type Deposit = DepositRequest | DepositObject;

export function isDepositRequest(deposit?: Deposit): deposit is DepositRequest {
  return (
    deposit != null &&
    "depositRequestId" in deposit &&
    typeof deposit.depositRequestId === "string"
  );
}

const depositRequestSchema: JSONSchemaType<DepositRequest> = {
  type: "object",
  properties: {
    depositRequestId: { type: "string" },
  },
  required: ["depositRequestId"],
};

const depositObjectSchema: JSONSchemaType<DepositObject> = {
  type: "object",
  properties: {
    currency: {
      type: "string",
      minLength: 3,
      maxLength: 3,
    },
    amount: optional({
      type: "number",
    }),
    buttons: optional({
      type: "array",
      items: {
        type: "number",
      },
    }),
    editable: optional({ type: "boolean" }),
    customAmount: optional({
      type: "object",
      properties: {
        minimum: optional({ type: "number" }),
        maximum: optional({ type: "number" }),
        multipleOf: optional({ type: "number" }),
      },
      required: [],
    }),
  },
  anyOf: [
    {
      required: ["amount"],
    },
    {
      required: ["buttons"],
    },
  ],
  required: ["currency"],
};

export const depositSchema: JSONSchemaType<Deposit> = {
  type: "object",
  oneOf: [depositRequestSchema, depositObjectSchema],
};
