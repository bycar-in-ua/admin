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
        v-if="!formModel.reference"
        class="w-full"
        :show-file-list="false"
        @change="formColorUploadHandler"
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
        v-if="color.id"
        type="primary"
        :loading="isFetching"
        :disabled="isFetching"
        @click="updateHandler"
      >
        {{ t("save") }}
      </n-button>
      <n-button
        v-else
        type="primary"
        :loading="isFetching"
        :disabled="isFetching"
        @click="createHandler"
      >
        {{ t("create") }}
      </n-button>
    </div>
  </n-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ColorForm",
});
</script>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
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
  useNotification,
} from "naive-ui";
import ColorCard from "../ColorCard.vue";
import { ArchiveOutline } from "@vicons/ionicons5";
import i18n from "@/i18n/index.js";
import apiClient from "@/helpers/apiClient";
import useClipboard from "@/hooks/useClipboard";
import { useColorsStore } from "@/stores/vehicleEditor/colors.store";
import { ColorDto as Color } from "@bycar-in-ua/common";

const props = defineProps<{ color: Color }>();
const emit = defineEmits(["toggle-form"]);

const colorsStore = useColorsStore();
const notification = useNotification();
const { t } = useI18n();
const { getImage } = useClipboard();

const colorItems = Object.keys(i18n.ua.colors.shades).map((color) => ({
  value: color,
  label: t(`colors.shades.${color}`),
}));

const isFetching = ref(false);

const formModel = ref(props.color);

const createHandler = async () => {
  try {
    isFetching.value = true;
    await colorsStore.createNewColor(formModel.value);
    emit("toggle-form", false);
    notification.success({
      title: t("notifications.success.title.default"),
      duration: 3000,
    });
  } catch (error: Error) {
    notification.error({
      title: t("notifications.error.title.default"),
      description: error.message,
      duration: 5000,
    });
  } finally {
    isFetching.value = false;
  }
};

const updateHandler = async () => {
  try {
    isFetching.value = true;
    await colorsStore.updateColor(formModel.value);
    emit("toggle-form", false);
    notification.success({
      title: t("notifications.success.title.default"),
      duration: 3000,
    });
  } catch (error: Error) {
    notification.error({
      title: t("notifications.error.title.default"),
      description: error.message,
      duration: 5000,
    });
  } finally {
    isFetching.value = false;
  }
};

const uploader = async (file) => {
  try {
    isFetching.value = true;
    const colorImageLink = await apiClient.uploadFiles([file], "colors");
    formModel.value.reference = colorImageLink[0].path;
    notification.success({
      title: t("images.save.success"),
      duration: 3000,
    });
  } catch (error: Error) {
    notification.error({
      title: t("notifications.error.title.default"),
      description: error.message,
      duration: 5000,
    });
  } finally {
    isFetching.value = false;
  }
};

const formColorUploadHandler = async ({ file }) => {
  await uploader(file.file);
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
