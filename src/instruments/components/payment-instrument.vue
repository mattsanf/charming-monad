<template>
  <div class="rebilly-instruments-payment-instrument">
    <!-- <r-method-icon
      class="rebilly-instruments-payment-instrument-method"
      :instrument="paymentInstrument"
    /> -->

    <template v-if="instrument.brand">
      <span class="rebilly-instruments-payment-instrument-brand">
        {{ processInstrumentBrand(instrument.brand) }}
      </span>
    </template>
    <span
      v-if="instrument.last4"
      class="rebilly-instruments-payment-instrument-last4"
    >
      <strong>**** {{ instrument.last4 }}</strong>
    </span>
    <span
      v-if="instrument.expMonth"
      class="rebilly-instruments-payment-instrument-exp"
    >
      Exp. {{ instrument.expMonth }} /
      {{ instrument.expYear }}
    </span>
    <span
      v-if="
        !instrument.method ||
        !['payment-card', 'digital-wallet'].includes(instrument.method)
      "
    >
      <template>{{ instrument.method }}</template>
    </span>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  instrument: {
    type: Object,
    default: () => ({}),
  },
});

function processInstrumentBrand(name = "") {
  return name === "American Express" ? "Amex" : name;
}
</script>

<style>
.rebilly-instruments-payment-instrument {
  outline: 1px solid red;
}
</style>
