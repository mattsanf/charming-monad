<template>
  <main v-if="router.activeRoute">
    <component :is="router.activeRoute.component"></component>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, provide } from "vue";
import { useConfiguration } from "./store/configuration";
import { useData } from "./store/data";
import { createRouter } from "./view/router";
import { setupFramepay } from "./vendor/framepay";
import routes from "./view/routes";

const {
  actions: { initalize: initalizeConfiguration },
} = useConfiguration();
const {
  data,
  actions: { fetch: fetchData },
} = useData();

const props = defineProps({
  config: String,
});
const router = createRouter({
  routes,
});

provide("router", router);

onMounted(async () => {
  await initalizeConfiguration(props.config);
  await fetchData();
  await setupFramepay();
  router.navigate("method-selector");
});
</script>

<style lang="scss">
@import "@rebilly/revel/dist/style.css";
@import "./components/**/**/*.scss";
@import "./view/**/**/*.scss";
</style>
