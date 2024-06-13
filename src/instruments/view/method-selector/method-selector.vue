<template>
  <section class="method-selector">
    <express-methods />
    <tabs v-model="activeTab" />
    <component
      v-if="methodRouter.activeRoute"
      :is="methodRouter.activeRoute.component"
      :method="activeTab"
    ></component>
  </section>
</template>

<script lang="ts" setup>
import { ref, provide, watch } from "vue";
import ExpressMethods from "./components/express-methods.vue";
import Tabs from "./components/tabs.vue";
import { createRouter } from "../router";
import routes from "./routes";

const activeTab = ref();

const methodRouter = createRouter({
  routes,
});

provide("methodRouter", methodRouter);

watch(activeTab, (value) => {
  switch (value.method) {
    case "payment-card":
      methodRouter.navigate(value.method);
      break;
    default:
      methodRouter.navigate("alternative");
      break;
  }
});
</script>
