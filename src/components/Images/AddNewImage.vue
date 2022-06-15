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
    >
  </form>
</template>

<script>
export default {
  name: "AddNewImage",
};
</script>

<script setup>
import { ref, onMounted, onBeforeUnmount, inject } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { NButton, useNotification } from "naive-ui";
import apiClient from "@/helpers/apiClient";
import { FETCH_IMAGES } from "@/store/modules/library/images/actionTypes";
import useClipboard from "@/hooks/useClipboard";

const store = useStore();
const { t } = useI18n();
const notification = useNotification();
const { getImages } = useClipboard();

const cdnPathToSave = inject("cdnPathToSave");

const isUploading = ref(false);

const fileInput = ref();

const handleClick = () => {
  fileInput.value.click();
};

/**
 * @param {Array.<File>} files
 * @param {string} pathTosave
 */
const uploader = async (files) => {
  try {
    isUploading.value = true;
    const uploadImages = await apiClient.uploadFiles(files, cdnPathToSave);
    await apiClient.post("/images", uploadImages);
    store.dispatch(FETCH_IMAGES);
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
  const images = getImages(e);

  if (images) {
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
