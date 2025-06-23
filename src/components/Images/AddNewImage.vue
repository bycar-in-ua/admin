<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, inject } from "vue";
import { useI18n } from "vue-i18n";
import { NButton, useNotification } from "naive-ui";
import useClipboard from "@/hooks/useClipboard";
import { useImagesStore } from "@/stores/images.store";
import { cdnPathToSaveKey } from "./keys";
import { useImagesService } from "@/composables/useImagesService";

defineOptions({
  name: "AddNewImage",
});

const imagesStore = useImagesStore();
const { t } = useI18n();
const notification = useNotification();
const { getImages } = useClipboard();

const cdnPathToSave = inject(cdnPathToSaveKey);

const isUploading = ref(false);

const fileInput = ref();

const handleClick = () => {
  fileInput.value.click();
};

const imagesService = useImagesService();

const uploader = async (files: Array<File>) => {
  try {
    isUploading.value = true;
    await imagesService.uploadImagesWithPath(files, cdnPathToSave);
    await imagesStore.fetchImages(1);
    notification.success({
      title: t("images.save.success"),
      duration: 3000,
    });
  } catch (error) {
    console.log(error);
    notification.error({
      title: t("notifications.error.title.default"),
      duration: 5000,
    });
  } finally {
    isUploading.value = false;
  }
};

const uploadHandler = async (e) => {
  await uploader(e.target.files);
};

async function pasteListener(e) {
  const images: Array<File> | boolean = getImages(e);

  if (Array.isArray(images)) {
    await uploader(images);
    return;
  }
  return;
}

onMounted(() => {
  window.addEventListener("paste", pasteListener);
});

onBeforeUnmount(() => {
  window.removeEventListener("paste", pasteListener);
});
</script>

<template>
  <form>
    <n-button
      type="primary"
      size="medium"
      :loading="isUploading"
      :disabled="isUploading"
      @click="handleClick"
    >
      {{ t("images.upload", 2) }}
    </n-button>
    <input
      ref="fileInput"
      type="file"
      name="imagesArray"
      class="hidden"
      multiple
      @change="uploadHandler"
    />
  </form>
</template>
