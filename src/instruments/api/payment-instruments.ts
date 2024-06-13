import { useRebillyStorefrontAPI } from "./index";

export async function StorefrontGetPaymentInstrumentCollection({
  filter,
  sort,
  limit,
  offset,
  q,
}: { [key: string]: string } = {}) {
  const { api } = useRebillyStorefrontAPI();

  const payload: { [key: string]: string } = {
    filter: `status:active,inactive,verification-needed`,
  };
  if (filter) {
    payload.filter = `${payload.filter},${filter}`;
  }
  if (sort) {
    payload.sort = sort;
  }
  if (limit) {
    payload.limit = limit;
  }
  if (offset) {
    payload.offset = offset;
  }
  if (q) {
    payload.q = q;
  }

  const { items: paymentInstruments } =
    await api.paymentInstruments.getAll(payload);
  return paymentInstruments.map(({ fields }) => fields);
}
