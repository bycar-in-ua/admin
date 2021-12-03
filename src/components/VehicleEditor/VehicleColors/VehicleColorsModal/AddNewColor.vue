<template>
  <n-form class="max-w-xl mx-auto" :disabled="isFetching">
    <n-form-item :label="t('colors.name')">
      <n-input v-model:value="formModel.name" />
    </n-form-item>
    <n-form-item :label="t('colors.closestShade')">
      <n-select v-model:value="formModel.closestShade" :options="colorItems" />
    </n-form-item>
    <n-form-item :label="t('colors.title')">
      <n-upload
        class="w-full"
        v-if="!formModel.reference"
        @change="formColorUploadHandler"
        :show-file-list="false"
      >
        <n-upload-dragger>
          <n-icon size="48" :depth="3">
            <archive-outline />
          </n-icon>
        </n-upload-dragger>
      </n-upload>
      <color-card
        v-else
        class="mx-auto"
        :color="formModel"
        :close-action="() => (formModel.reference = null)"
      />
    </n-form-item>
    <div class="flex justify-end">
      <n-button
        type="primary"
        :loading="isFetching"
        :disabled="isFetching"
        @click="submitHandler"
      >
        {{ t("create") }}
      </n-button>
    </div>
  </n-form>
</template>

<script>
export default {
  name: "AddNewColor",
};
</script>

<script setup>
import { ref, computed, inject, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import {
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NButton,
  NIcon,
  NUpload,
  NUploadDragger,
} from "naive-ui";
import ColorCard from "../ColorCard";
import { ArchiveOutline } from "@vicons/ionicons5";
import { colorsRU } from "@/i18n/colors";
import apiClient from "@/helpers/apiClient";
import { CREATE_NEW_COLOR } from "@/store/modules/library/actionTypes";
import useClipboard from "@/hooks/useClipboard";

const store = useStore();
const { t } = useI18n();
const { getImage } = useClipboard();

const toggleAdding = inject("toggleAddingNewColor");

const carBrand = computed(() => store.state.carEditor.car.brand);

const colorItems = Object.keys(colorsRU.shades).map((color) => ({
  value: color,
  label: t(`colors.shades.${color}`),
}));

const isFetching = ref(false);

const formModel = ref({
  name: "",
  closestShade: null,
  reference: null,
});

const uploader = async (file) => {
  try {
    isFetching.value = true;
    const colorImageLink = await apiClient.uploadFiles("/upload-color", [file]);
    formModel.value.reference = colorImageLink[0];
  } finally {
    isFetching.value = false;
  }
};

const formColorUploadHandler = async ({ file }) => {
  await uploader(file.file);
};

const submitHandler = async () => {
  try {
    isFetching.value = true;
    await store.dispatch(CREATE_NEW_COLOR, {
      ...formModel.value,
      brandIdentity: carBrand.value,
    });
    toggleAdding(false);
  } finally {
    isFetching.value = false;
  }
};

async function pasteListener(e) {
  const image = getImage(e);

  if (image) {
    await uploader(image);
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
