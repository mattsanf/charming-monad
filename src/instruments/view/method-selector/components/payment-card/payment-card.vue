<template>
  <section>
    <r-radio
      class="payment-card-existing-instrument"
      v-for="instrument in availiableInstruments"
      :key="instrument.id"
      v-model="selectedInstrument"
      :value="instrument"
    >
      <template #label>
        <payment-instrument :instrument="instrument">
          {{ instrument.id }}
        </payment-instrument>
      </template>
    </r-radio>
  </section>
  <div class="actions">
    <r-button class="r-inline-3" size="large">Add new payment card</r-button>
    <r-button type="primary" size="large">Continue</r-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { RRadio, RButton } from "@rebilly/revel";
import { StorefrontGetPaymentInstrumentCollection } from "../../../../api/payment-instruments";
import PaymentInstrument from "../../../../components/payment-instrument.vue";

const availiableInstruments = ref([]);
const selectedInstrument = ref();

const props = defineProps({
  method: Object,
});

onMounted(async () => {
  const payload: { filter?: string } = {};
  if (props.method?.filters) {
    payload.filter = props.method.filters.join(",");
  }
  availiableInstruments.value =
    await StorefrontGetPaymentInstrumentCollection(payload);
});
</script>
