import { useRebillyStorefrontAPI } from "./index";
import { useConfiguration } from "../store/configuration";

export async function StorefrontGetTransaction() {
  const { configuration } = useConfiguration();
  const { api } = useRebillyStorefrontAPI();

  const { fields: transaction } = await api.transactions.get({
    id: configuration.transactionId,
  });
  return transaction;
}
