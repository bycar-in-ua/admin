<script setup lang="ts">
import type { Dealer } from "@bycar-in-ua/sdk";
import { NButton, NSpace } from "naive-ui";
import { useI18n } from "vue-i18n";

const props = defineProps<{ dealer: Dealer }>();

const { t } = useI18n();
</script>

<template>
  <NSpace justify="end">
    <RouterLink
      :to="{
        name: 'EditDealer',
        params: { id: props.dealer.id },
      }"
    >
      <NButton size="small" type="primary"> {{ t("edit") }} </NButton>
    </RouterLink>
  </NSpace>
</template>
