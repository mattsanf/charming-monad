import { JSONSchemaType } from "ajv/dist/2019";
import { optional } from "./utils";

type AddressFields =
  | "email"
  | "organization"
  | "phoneNumber"
  | "city"
  | "country"
  | "region"
  | "postalCode"
  | "address"
  | "address2";

export interface Address {
  name?: "default" | "combined" | "stacked";
  region?: "default" | "split" | "stacked";
  show?: (AddressFields | "all")[];
  hide?: (AddressFields | "all")[];
  require?: AddressFields[];
}

const addressFields: AddressFields[] = [
  "email",
  "organization",
  "phoneNumber",
  "city",
  "country",
  "region",
  "postalCode",
  "address",
  "address2",
];

type AdditionalFields = "poNumber";

const additionalFields: AdditionalFields[] = ["poNumber"];

export interface DisplayOptions {
  buttonColor?: string;
  buttonHeight?: string;
  buttonType?: string;
}

export interface DigitalWalletConfiguration {
  displayOptions?: DisplayOptions;
}

export interface PaymentInstrumentsOptionFlags {
  compactExpressInstruments?: boolean;
  allowDeactivate?: boolean;
  allowUpdate?: boolean;
  allowMakeDefault?: boolean;
  allowCreate?: boolean;
}
export interface PaymentInstrumentsDisplayOptions
  extends PaymentInstrumentsOptionFlags {
  address?: Address;
  paypal?: {
    buttonHeight?: number;
  };
  googlePay?: DigitalWalletConfiguration;
  applePay?: DigitalWalletConfiguration;
  additionalFields?: {
    show?: AdditionalFields[];
    require?: AdditionalFields[];
  };
}

const addressSchema: JSONSchemaType<Address> = {
  type: "object",
  properties: {
    name: optional({
      type: "string",
      enum: ["default", "combined", "stacked"],
      default: "default",
    }),
    region: optional({
      type: "string",
      enum: ["default", "split", "stacked"],
      default: "default",
    }),
    show: optional({
      type: "array",
      default: [],
      items: {
        type: "string",
        enum: ["all", ...addressFields],
      },
    }),
    hide: optional({
      type: "array",
      default: [],
      items: {
        type: "string",
        enum: ["all", ...addressFields],
      },
    }),
    require: optional({
      type: "array",
      default: [],
      items: {
        type: "string",
        enum: addressFields,
      },
    }),
  },
  default: {},
  required: [],
};

const digitalWalletConfigurationSchema: JSONSchemaType<DigitalWalletConfiguration> =
  {
    type: "object",
    properties: {
      displayOptions: optional({
        type: "object",
        properties: {
          buttonColor: optional({
            type: "string",
            default: "black",
          }),
          buttonHeight: optional({
            type: "string",
            pattern: "^[0-9]+px$",
            default: "48px",
          }),
          buttonType: optional({
            type: "string",
            default: "plain",
          }),
        },
        default: {},
      }),
    },
    default: {},
    required: [],
  };

export const paymentInstrumentsDisplayOptionsSchema: JSONSchemaType<PaymentInstrumentsDisplayOptions> =
  {
    type: "object",
    properties: {
      compactExpressInstruments: optional({
        type: "boolean",
        default: false,
      }),
      allowDeactivate: optional({
        type: "boolean",
        default: false,
      }),
      allowUpdate: optional({
        type: "boolean",
        default: false,
      }),
      allowMakeDefault: optional({
        type: "boolean",
        default: false,
      }),
      allowCreate: optional({
        type: "boolean",
        default: true,
      }),
      address: optional(addressSchema),
      paypal: optional({
        type: "object",
        properties: {
          buttonHeight: optional({
            type: "number",
            default: 48,
          }),
        },
        default: {},
        required: [],
      }),
      googlePay: optional(digitalWalletConfigurationSchema),
      applePay: optional(digitalWalletConfigurationSchema),
      additionalFields: optional({
        type: "object",
        properties: {
          show: optional({
            type: "array",
            default: [],
            items: {
              type: "string",
              enum: [...additionalFields],
            },
          }),
          require: optional({
            type: "array",
            default: [],
            items: {
              type: "string",
              enum: [...additionalFields],
            },
          }),
        },
      }),
    },
    default: {},
    required: [],
  };
