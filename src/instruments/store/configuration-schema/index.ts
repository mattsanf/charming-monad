import { JSONSchemaType } from "ajv/dist/2019";
import { optional } from "./utils";
import { planItemsSchema, type PlanItem } from "./plan-items-schema";
import { itemsSchema, type Item } from "./items-schema";
import { moneySchema, type Money } from "./money-schema";
import { depositSchema, type Deposit } from "./deposit-schema";
import { payoutSchema, type Payout } from "./payout-schema";
import { i18nSchema, type I18n } from "./i18n-schema";
import { themeSchema, type ThemeProperties } from "./theme-schema";
import {
  paymentInstrumentsDisplayOptionsSchema,
  type PaymentInstrumentsDisplayOptions,
} from "./payment-instruments-schema";
import { featuresSchema, type Features } from "./features-schema";
import { devSchema, type DevProperties } from "./dev-schema";

const purchaseDataKeys = [
  "items",
  "transactionId",
  "invoiceId",
  "money",
  "deposit",
  "payout",
];

const requireJWT = ["invoiceId", "transactionId", "deposit", "payout"];

export interface Options {
  organizationId?: string;
  publishableKey?: string;
  websiteId?: string;
  addons?: PlanItem[];
  bumpOffer?: PlanItem[];
  items: Item[];
  money: Money;
  invoiceId: string;
  transactionId: string;
  deposit: Deposit;
  payout: Payout;
  form?: string | object;
  summary?: string | object;
  jwt?: string;
  apiMode: "sandbox" | "live";
  transactionType?: "purchase" | "setup";
  css?: string;
  theme?: ThemeProperties;
  i18n?: I18n;
  countryCode?: string;
  locale?: "en" | "es" | "auto";
  paymentInstruments?: PaymentInstrumentsDisplayOptions;
  features?: Features;
  _dev?: DevProperties;
}

const schema: JSONSchemaType<Options> = {
  title: "Mount Options Schema",
  type: "object",
  properties: {
    organizationId: optional({ type: "string" }),
    publishableKey: optional({ type: "string" }),
    websiteId: optional({ type: "string" }),
    items: itemsSchema,
    money: moneySchema,
    invoiceId: { type: "string" },
    transactionId: { type: "string" },
    deposit: depositSchema,
    payout: payoutSchema,
    jwt: optional({ type: "string" }),
    addons: optional(planItemsSchema),
    bumpOffer: optional(planItemsSchema),
    form: optional({
      default: ".rebilly-instruments",
      type: ["string", "object"],
      oneOf: [
        {
          type: "string",
        },
        {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
          },
        },
      ],
    }),
    summary: optional({
      default: ".rebilly-instruments-summary",
      type: ["string", "object"],
      oneOf: [
        {
          type: "string",
        },
        {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
          },
        },
      ],
    }),
    apiMode: {
      type: "string",
      enum: ["sandbox", "live"],
    },
    transactionType: optional({
      type: "string",
      enum: ["purchase", "setup"],
      default: "purchase",
    }),
    css: optional({ type: "string" }),
    theme: optional(themeSchema),
    i18n: optional(i18nSchema),
    countryCode: optional({
      type: "string",
      default: "US",
    }),
    locale: optional({
      type: "string",
      default: "auto",
    }),
    paymentInstruments: optional(paymentInstrumentsDisplayOptionsSchema),
    features: optional(featuresSchema),
    _dev: optional(devSchema),
  },
  required: ["apiMode"],
  dependentRequired: {
    ...requireJWT.reduce((accumulator, currentValue) => {
      return {
        ...accumulator,
        [`${currentValue}`]: ["jwt"],
      };
    }, {}),
  },
  anyOf: [
    ...purchaseDataKeys.map((key) => {
      const otherPurchaseDataKeys = purchaseDataKeys.filter(
        (value) => value !== key,
      );
      return {
        if: { required: [key] },
        then: {
          properties: {
            ...otherPurchaseDataKeys.reduce((otherProperties, currentKey) => {
              return {
                ...otherProperties,
                [currentKey]: false,
              };
            }, {}),
          },
        },
        else: false,
      };
    }),
    {
      required: ["jwt"],
    },
  ],
};

export default schema;
