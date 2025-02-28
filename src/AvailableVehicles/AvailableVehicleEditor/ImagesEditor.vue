<script setup lang="ts">
import { ref, h } from "vue";
import { NImageGroup, NImage, NCard, NButton, NEmpty, NModal } from "naive-ui";
import { useI18n } from "vue-i18n";
import Images, { type ToolbarAction } from "@/components/Images/index.vue";
import { useAvailableVehicleEditorStore } from "@/stores/availableVehicleEditor.store";
import { useImagesStore } from "@/stores/images.store";
import { cdnLink } from "@/helpers/cdn";

const { t } = useI18n();

const availalbeVehicleEditorStore = useAvailableVehicleEditorStore();
const imagesStore = useImagesStore();

const showModal = ref(false);

function openModal() {
  imagesStore.fetchImages(1);
  showModal.value = true;
}

function saveImages(selectedImages: number[]) {
  availalbeVehicleEditorStore.availableVehicleEditorState.images =
    selectedImages;

  availalbeVehicleEditorStore.saveAvailableVehicle().then(() => {
    availalbeVehicleEditorStore.refetchCar();
    showModal.value = false;
  });
}

const toolbarActions: ToolbarAction[] = [
  {
    component: h(
      NButton,
      {
        type: "primary",
        class: "mr-4",
      },
      () => t("save")
    ),
    clickCallback: saveImages,
  },
];
</script>

<template>
  <NCard :title="t('images.title', 2)" class="my-4 shadow">
    <NImageGroup v-if="availalbeVehicleEditorStore.car?.images?.length">
      <div class="grid gap-4 grid-cols-3 md:grid-cols-5 xl:grid-cols-7">
        <NImage
          v-for="image in availalbeVehicleEditorStore.car.images"
          :key="image.id"
          :src="cdnLink(image.path, 'small')"
          :preview-src="cdnLink(image.path, 'large')"
          :alt="image.alt"
          object-fit="cover"
        />
      </div>
    </NImageGroup>

    <NEmpty v-else description="Даний автомобіль не має зображень" />

    <NModal
      v-model:show="showModal"
      preset="card"
      class="max-w-6xl"
      display-directive="if"
    >
      <Images
        :is-selectable="true"
        :toolbar-actions="toolbarActions"
        :preselected-images="
          availalbeVehicleEditorStore.availableVehicleEditorState.images
        "
        :cdn-path-to-save="
          availalbeVehicleEditorStore?.car?.vehicle?.brand?.slug || ''
        "
      />
    </NModal>

    <template #action>
      <div class="flex justify-end">
        <NButton type="primary" size="medium" @click="openModal">
          {{ t("images.add", 2) }}
        </NButton>
      </div>
    </template>
  </NCard>
</template>
