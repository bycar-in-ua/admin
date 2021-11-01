<template>
  <form class="my-4 text-right">
    <n-button
      type="primary"
      size="medium"
      :loading="isUploading"
      :disabled="isUploading"
      @click="handleClick"
    >
      {{ t("images.addNew") }}
    </n-button>
    <input
      type="file"
      name="imagesArray"
      class="hidden"
      ref="fileInput"
      multiple
      @change="uploadHandler"
    />
  </form>
</template>

<script>
export default {
  name: "AddNewImage",
};
</script>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { NButton } from "naive-ui";
import apiClient from "@/helpers/apiClient";
import { FETCH_IMAGES } from "@/store/modules/library/images/actionTypes";

const store = useStore();
const { t } = useI18n();

const isUploading = ref(false);

const fileInput = ref();

const handleClick = () => {
  fileInput.value.click();
};

const uploadHandler = async (e) => {
  try {
    isUploading.value = true;
    const uploadImages = await apiClient.uploadFiles("/upload", e.target.files);
    const newImages = await apiClient.post("/images", uploadImages);
    store.dispatch(FETCH_IMAGES);
  } catch (error) {
    console.log(error);
  } finally {
    isUploading.value = false;
  }
};
</script>
