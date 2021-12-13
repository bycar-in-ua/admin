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

<script>
export default {
  name: "ColorForm",
};
</script>

<script setup>
import {
  ref,
  computed,
  inject,
  onMounted,
  onBeforeUnmount,
  defineProps,
} from "vue";
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
import {
  CREATE_NEW_COLOR,
  UPDATE_COLOR,
} from "@/store/modules/library/actionTypes";
import useClipboard from "@/hooks/useClipboard";

/**
 * @typedef ColorFormProps
 * @type {Object}
 * @property {Number || null} id
 * @property {String || null} name
 * @property {String || null} closestShade
 * @property {String || null} reference
 *
 * Color props
 * @param {ColorFormProps} color
 */
const props = defineProps({
  color: {
    type: Object,
    requierd: true,
  },
});

const store = useStore();
const { t } = useI18n();
const { getImage } = useClipboard();

const toggleColorFormShowing = inject("toggleColorForm");

const carBrand = computed(() => store.state.carEditor.car.brand);

const colorItems = Object.keys(colorsRU.shades).map((color) => ({
  value: color,
  label: t(`colors.shades.${color}`),
}));

const isFetching = ref(false);

const formModel = ref(props.color);

const createHandler = async () => {
  try {
    isFetching.value = true;
    await store.dispatch(CREATE_NEW_COLOR, {
      ...formModel.value,
      brandIdentity: carBrand.value,
    });
    toggleColorFormShowing(false);
  } finally {
    isFetching.value = false;
  }
};

const updateHandler = async () => {
  try {
    isFetching.value = true;
    await store.dispatch(UPDATE_COLOR, formModel.value);
    toggleColorFormShowing(false);
  } finally {
    isFetching.value = false;
  }
};

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
