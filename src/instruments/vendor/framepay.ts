import { ref } from "vue";
import { useConfiguration } from "../store/configuration";
import { useData } from "../store/data";
import merge from "lodash/merge";
import kebabCase from "lodash/kebabCase";
import camelCase from "lodash/camelCase";

// import { getMethodData } from "./get-method-data";
function getMethodData(method) {
  const id = kebabCase(method.feature?.name || method.method);
  const type = camelCase(method.feature?.name || method.method).replace(
    "-",
    "",
  );

  return { id, type };
}

export function generateDigitalWallet(expressMethods = []) {
  const { configuration } = useConfiguration();
  const { getters } = useData();
  const output = {};

  const { paymentInstruments } = configuration;

  const transactionData = {
    countryCode: configuration.countryCode,
    label: configuration.websiteId,
  };

  const { amount, currency } = getters;
  transactionData.amount = amount();
  transactionData.currency = currency();

  expressMethods.forEach((method) => {
    const { type } = getMethodData(method);

    if (method.feature?.name === "Google Pay") {
      output[type] = {
        transactionData,
        merchantConfig: {
          merchantName: method.feature.merchantName,
          merchantOrigin: method.feature.merchantOrigin,
        },
        googlePayDisplayOptions: paymentInstruments.googlePay.displayOptions,
      };
    }
  });

  configuration.digitalWallet = output;
}

export const framepayMounted = ref<string | boolean>(false);

export function generateFramepayConfig() {
  const { data } = useData();
  const { configuration } = useConfiguration();

  generateDigitalWallet(
    data.readyToPay.filter((pay) => pay.metadata.isExpressMethod),
  );

  console.log({ configuration });

  const config = {
    style: configuration.themeFramepay,
    locale: configuration?.locale || "auto",
    organizationId: configuration.organizationId,
    websiteId: configuration.websiteId,
    methods: configuration.payout ? data.readyToPayout : data.readyToPay,
  };

  // if (methodIds.includes("pay-pal-billing-agreement")) {
  //   config.transactionData = merge(
  //     typeof config.transactionData === "object" ? config.transactionData : {},
  //     { amount: data.amount, currency: data.currency },
  //   );
  //   config.paypal = configuration.paymentInstruments?.paypal;
  // }

  // if (methodIds.includes("google-pay")) {
  config.transactionData = merge(
    typeof config.transactionData === "object" ? config.transactionData : {},
    configuration.digitalWallet?.googlePay?.transactionData,
  );
  config.googlePay =
    configuration.digitalWallet?.googlePay?.googlePayDisplayOptions;
  // }

  // if (methodIds.includes("apple-pay")) {
  //   config.transactionData = merge(
  //     typeof config.transactionData === "object" ? config.transactionData : {},
  //     configuration.digitalWallet?.applePay?.transactionData,
  //   );
  //   config.applePay =
  //     configuration.digitalWallet?.applePay?.applePayDisplayOptions;
  // }

  // if (configuration.publishableKey) {
  //   config.publishableKey = configuration.publishableKey;
  // }

  if (configuration.jwt) {
    config.jwt = configuration.jwt;
    config.sandbox = configuration.apiMode === "sandbox";
  }

  if (data.riskMetadata) {
    config.riskMetadata = data.riskMetadata;
  }

  return config;
}

export async function useFramepay() {
  // TODO handle pending setup
  if (window.Rebilly && !window.Rebilly.initalized) {
    await window.Rebilly.initialize(generateFramepayConfig());
  }
  return { framepay: window.Rebilly };
}

export function setupFramepay() {
  framepayMounted.value = "pending";
  const {
    configuration: { _dev },
  } = useConfiguration();

  const urls = {
    script:
      _dev?.framePayScriptLink || "https://framepay.rebilly.com/framepay.js",
    style:
      _dev?.framePayStyleLink || "https://framepay.rebilly.com/framepay.css",
  };

  return new Promise((resolve) => {
    const framepayStyle = document.createElement("link");
    framepayStyle.setAttribute("href", urls.style);
    framepayStyle.setAttribute("rel", "stylesheet");
    document.head.prepend(framepayStyle);

    const framepayScript = document.createElement("script");
    framepayScript.setAttribute("src", urls.script);

    framepayScript.onload = () => {
      framepayMounted.value === true;
      resolve();
    };
    document.head.append(framepayScript);
  });
}
