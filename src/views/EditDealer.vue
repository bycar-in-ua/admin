<script setup lang="ts">
import { onUnmounted, provide } from "vue";
import { NButton, NPopconfirm, NSpace, useNotification } from "naive-ui";
import { useI18n } from "vue-i18n";
import { useDealerEditorStore } from "@/stores/dealerEditor.store";
import DealerEditor from "@/Dealers/DealerEditor.vue";
import EditorTemplate from "@/components/common/EditorTemplate.vue";

const { t } = useI18n();
const notification = useNotification();

const dealerEditorStore = useDealerEditorStore();

async function saveHandler() {
  await dealerEditorStore.updateDealer();

  notification.success({
    title: `Дані дилера "${dealerEditorStore.dealer.name}" оновлено`,
    duration: 3000,
  });
}

provide("saveDealer", saveHandler);

async function deleteHandler() {
  const dealer = dealerEditorStore.dealer;

  await dealerEditorStore.deleteDealer();

  notification.warning({
    title: `Дилера "${dealer.name}" видалено`,
    duration: 3000,
  });
}

onUnmounted(() => {
  dealerEditorStore.$dispose();
});
</script>

<template>
  <EditorTemplate :loading="dealerEditorStore.dealerFetching">
    <DealerEditor />

    <template #sidebar>
      <NSpace justify="end">
        <NPopconfirm
          positive-text="Видалити"
          negative-text="Скасувати"
          :loading="dealerEditorStore.deletePending"
          @positive-click="deleteHandler"
        >
          <template #trigger>
            <NButton
              type="error"
              ghost
              :loading="dealerEditorStore.deletePending"
            >
              {{ t("delete") }}
            </NButton>
          </template>
          <div class="max-w-96">
            Ви впевнені, що хочете видалити дилера?<br />
            З видаленням дилера будуть видалені всі автомобілі в наявності,
            котрі були прив'язані до цього дилера
          </div>
        </NPopconfirm>

        <NButton type="primary" @click="saveHandler"> {{ t("save") }} </NButton>
      </NSpace>
    </template>
  </EditorTemplate>
</template>
