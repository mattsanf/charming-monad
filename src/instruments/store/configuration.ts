import { reactive } from "vue";
import { jwtDecode } from "jwt-decode";
import { validateOptions } from "./configuration-validation";
import merge from "lodash/merge";
import { isDepositRequest } from "./configuration-schema/deposit-schema";

interface JWT {
  merchant: string;
  claims: {
    transactionId?: string;
    invoiceId?: string;
    websiteId: string;
    cashierRequestId: string;
  };
}

export function handleComputedProperty(options) {
  return Object.assign({}, options, {
    _computed: {
      version: import.meta.env.PACKAGE_VERSION,
      paymentMethodsUrl:
        options._dev?.paymentMethodsUrl ?? "https://forms.secure-payments.app",
    },
  });
}

export function handleNestedPropertiesDefaultValues(options) {
  /*
    The JSON Schema default property doesn't work on nested schemas.
    So we'll need to handle the default properties in these instances.
    In most cases default property in schema is sufficient.

    see https://ajv.js.org/guide/modifying-data.html#assigning-defaults
  */
  if (!isDepositRequest(options.deposit) && options.deposit?.currency) {
    options.deposit = merge(
      {
        editable: true,
        buttons: [],
        customAmount: {
          minimum: 1,
          maximum: 1000000000000,
          multipleOf: 1,
        },
      },
      options.deposit || {},
    );

    // default to first deposit button if there is no deposit amount
    if (Number.isNaN(options.deposit.amount)) {
      if (options.deposit.buttons && options.deposit.buttons.length > 0) {
        [options.deposit.amount] = options.deposit.buttons;
      }
    }
  } else if (isDepositRequest(options.deposit)) {
    options.deposit = merge(
      {
        customAmount: {
          minimum: 1,
          maximum: 1000000000000,
          multipleOf: 1,
        },
      },
      options.deposit || {},
    );
  }

  // if (options.items) {
  //   options.items = options.items.map((item) => ({
  //     ...item,
  //     quantity: parseQuantity(item),
  //   }));
  // }

  return options;
}

export function handleJwtDestructuring(options) {
  if (options.jwt && !options.publishableKey) {
    const {
      merchant: organizationId,
      claims: { transactionId, invoiceId, websiteId, cashierRequestId },
    } = jwtDecode<JWT>(options.jwt);
    Object.entries({
      organizationId,
      transactionId,
      invoiceId,
      websiteId,
    }).forEach(([key, value]) => {
      if (value) {
        options[key] = value;
      }
    });
    if (cashierRequestId && !options.deposit) {
      options.deposit = Object.assign(
        {},
        {
          depositRequestId: cashierRequestId,
        },
      );
    }
  }

  return options;
}

async function setupConfiguration(options = {}) {
  let validOptions = await validateOptions(options);

  if (validOptions) {
    validOptions = handleJwtDestructuring(validOptions);
    validOptions = handleNestedPropertiesDefaultValues(validOptions);
    validOptions = handleComputedProperty(validOptions);
  }

  return validOptions;
}

import { defineStore, createPinia, setActivePinia } from "pinia";
setActivePinia(createPinia());

export interface Configuration {
  [key: string]: any;
}

export const useConfiguration = defineStore("configuration", () => {
  const configuration = reactive<Configuration>({});

  async function initalize(config: string) {
    const parsedConfig = JSON.parse(config);
    const validatedConfig = await setupConfiguration(parsedConfig);

    for (const key in validatedConfig) {
      configuration[key] = validatedConfig[key];
    }
  }

  return {
    configuration,
    actions: { initalize },
  };
});
