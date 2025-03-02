<script setup lang="ts">
import { inject } from "vue";
import { NButton, NIcon, NPopover } from "naive-ui";
import { Add } from "@vicons/ionicons5";
import { useI18n } from "vue-i18n";
import AddBrandsForm from "./AddBrandsForm.vue";

const { t } = useI18n();

const saveHandler = inject<() => void>("saveDealer");
</script>

<template>
  <NPopover
    trigger="click"
    placement="bottom"
    footer-class="flex justify-end"
    display-directive="if"
  >
    <template #trigger>
      <NButton size="small" quaternary title="Додати бренд">
        <template #icon>
          <NIcon>
            <Add />
          </NIcon>
        </template>
      </NButton>
    </template>

    <AddBrandsForm />

    <template #footer>
      <NButton size="small" type="primary" @click="saveHandler">
        {{ t("save") }}
      </NButton>
    </template>
  </NPopover>
</template>
