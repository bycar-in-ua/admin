<script setup lang="ts">
import { ref, h } from "vue";
import { useI18n } from "vue-i18n";
import { NImageGroup, NCard, NButton, NEmpty, NModal } from "naive-ui";
import { Image } from "@bycar-in-ua/sdk";
import { useAvailableVehicleEditorStore } from "@/stores/availableVehicleEditor.store";
import { useImagesStore } from "@/stores/images.store";
import {
  Images,
  DraggableImageCard,
  type ToolbarAction,
} from "@/components/Images";

const { t } = useI18n();

const availalbeVehicleEditorStore = useAvailableVehicleEditorStore();
const imagesStore = useImagesStore();

const showModal = ref(false);

function openModal() {
  imagesStore.fetchImages(1);
  showModal.value = true;
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
    clickCallback: (slectedImages) => {
      availalbeVehicleEditorStore.handleSelectedImages(slectedImages);
      showModal.value = false;
    },
  },
];

function onDrop(evt: DragEvent) {
  const draggableImageId = Number(evt.dataTransfer.getData("imageId"));
  const draggedImageIndex = availalbeVehicleEditorStore.editor.images.findIndex(
    ({ imageId }) => imageId === draggableImageId
  );

  const targetImageIndex = Number(
    (evt.target as HTMLElement)?.parentElement?.dataset.index
  );

  if (isNaN(targetImageIndex) || draggedImageIndex === targetImageIndex) {
    return;
  }

  const images = [...availalbeVehicleEditorStore.editor.images];

  images.splice(targetImageIndex, 0, images.splice(draggedImageIndex, 1)[0]);

  availalbeVehicleEditorStore.editor.images = images.map((image, index) => ({
    ...image,
    order: index + 1,
  }));
}

function deleteImageHandler(image: Image) {
  const targetImageIndex = availalbeVehicleEditorStore.editor.images.findIndex(
    ({ imageId }) => image.id === imageId
  );

  if (targetImageIndex === -1) {
    return;
  }

  availalbeVehicleEditorStore.editor.images.splice(targetImageIndex, 1);
}
</script>

<template>
  <NCard :title="t('images.title', 2)" class="my-4 shadow">
    <NImageGroup v-if="availalbeVehicleEditorStore.editor?.images?.length">
      <div
        class="grid gap-4 grid-cols-3 md:grid-cols-5 xl:grid-cols-7"
        @drop="onDrop"
        @dragover.prevent
        @dragenter.prevent
      >
        <DraggableImageCard
          v-for="({ imageId, image }, index) in availalbeVehicleEditorStore
            .editor.images"
          :key="imageId"
          :index
          :image
          @delete="deleteImageHandler"
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
          availalbeVehicleEditorStore.editor.images.map(({ image }) => image)
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
