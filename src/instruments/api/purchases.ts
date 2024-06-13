import { collectData } from "@rebilly/risk-data-collector";
import { useRebillyStorefrontAPI } from "./index";
import { useConfiguration } from "../store/configuration";
import { useData } from "../store/data";
import paymentMethodsMetadata from "../data/metadata.json";

export function filterReadyToPay(readyToPay) {
  //const paymentMethodsMetadata = [...paymentMethods];
  const EXPRESS_METHODS = ["Google Pay", "Apple Pay", "paypal"];
  const BLOCKED_METHODS = [
    // Requires implementation.
    "echeck",
    // Required unique implementation
    // account number, routing number, and account type required

    "Khelocard",
    // payment instrument is required
    // card number is required
    // card cvv is required
    // expiration month is required
    // expiration year is required

    "Klarna",
    // Klarna authorization token is required
    // Klarna session ID is required

    // Methods to ignore
    "Apple Pay", // Apple Pay should be used oßnly from payment-card method
    "China UnionPay", // China UnionPay should not be used
    "Google Pay", // Google Pay should be used only from payment-card method
    "KakaoPay", // KakaoPay is unimplemented digital wallet
    "Payco", // Payco is unimplemented digital wallet
    "Samsung Pay", // Samsung Pay is unimplemented digital wallet
  ];

  return readyToPay
    .filter((readyData) => {
      // Remove result for "old" paypal method
      const isOldPayPal = readyData.method === "paypal" && !readyData.feature;
      // Remove result for plaid method
      const isPlaid = readyData.method === "ach" && readyData.feature;
      // Remove result for blocked method
      const isBlocked = BLOCKED_METHODS.includes(readyData.method);

      return !isOldPayPal && !isPlaid && !isBlocked;
    })
    .map((fields, index) => {
      const metadata =
        paymentMethodsMetadata.find(
          (methodMetadata) => methodMetadata.apiName === fields.method,
        ) || {};
      metadata.isExpressMethod =
        EXPRESS_METHODS.includes(fields.method) ||
        EXPRESS_METHODS.includes(fields.feature?.name);

      return JSON.parse(
        JSON.stringify({
          index,
          metadata,
          ...fields,
        }),
      );
    });
}

export async function StorefrontPostReadyToPay() {
  const { configuration } = useConfiguration();
  const {
    data,
    getters: { amount, currency },
  } = useData();
  const { api } = useRebillyStorefrontAPI();

  if (!data.riskMetadata) {
    const { riskMetadata } = await collectData();
    data.riskMetadata = riskMetadata;
  }

  const payload = {
    riskMetadata: data.riskMetadata,
    websiteId: configuration.websiteId,
    amount,
    currency,
  };

  const { fields } = await api.purchase.readyToPay({
    data: payload,
  });
  const readyToPay = Object.values(fields);

  return filterReadyToPay(readyToPay);
}
