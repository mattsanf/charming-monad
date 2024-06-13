import { reactive } from "vue";
import { StorefrontGetTransaction } from "../api/transactions";
import { StorefrontPostReadyToPay } from "../api/purchases";
import { useConfiguration } from "./configuration";

import { defineStore, createPinia, setActivePinia } from "pinia";
setActivePinia(createPinia());

export interface Data {
  [key: string]: any;
}

export const useData = defineStore("data", () => {
  const data = reactive<Data>({});
  const { configuration } = useConfiguration();

  async function fetch() {
    if (configuration.transactionId) {
      data.transaction = await StorefrontGetTransaction();
    }

    data.readyToPay = await StorefrontPostReadyToPay();
  }

  function getAmount() {
    return data.transaction?.amount;
  }

  function getCurrency() {
    return data.transaction?.currency;
  }

  return {
    data,
    actions: { fetch },
    getters: {
      amount: getAmount,
      currency: getCurrency,
    },
  };
});
