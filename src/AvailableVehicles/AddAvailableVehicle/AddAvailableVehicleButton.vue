<script setup lang="ts">
import { ref } from "vue";
import { NButton, NModal } from "naive-ui";
import { useI18n } from "vue-i18n";
import AvailableVehicleForm from "./AvailableVehicleForm.vue";

const { t } = useI18n();

const show = ref(false);
</script>

<template>
  <NButton type="primary" @click="show = true">
    {{ t("add") }}
  </NButton>

  <NModal v-model:show="show" display-directive="if">
    <template #header-extra>
      <NButton type="error" @click="show = false">
        {{ t("cancel") }}
      </NButton>
    </template>

    <AvailableVehicleForm @cancel="show = false" />
  </NModal>
</template>
