<template>
  <div class="tabs">
    <div class="tab" v-for="method in tabs" @click="selectMethod(method)">
      <r-avatar
        :image="method.metadata.portraitLogo"
        :description="method.metadata.name"
      ></r-avatar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { RAvatar } from "@rebilly/revel";
import { useData } from "../../../store/data";

const { data } = useData();

const activeTab = defineModel();

const tabs = computed(() => {
  if (data.readyToPay) {
    return data.readyToPay.filter((pay) => !pay.metadata.isExpressMethod);
  }
  return [];
});

onMounted(() => {
  activeTab.value = tabs.value[0];
});

function selectMethod(method) {
  activeTab.value = method;
}
</script>
