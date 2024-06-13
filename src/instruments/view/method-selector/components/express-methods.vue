<template>
  <div class="express-methods">
    <div class="google-pay" ref="googlePayEl" style="max-height: 48px"></div>
    <div class="divider">
      <span class="divider-label">Or</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useFramepay } from "../../../vendor/framepay";

const googlePayEl = ref();

onMounted(async () => {
  const { framepay } = await useFramepay();
  // for (const pay of readyToPay.value) {
  framepay.googlePay.mount(googlePayEl.value);
  // }
});
</script>
