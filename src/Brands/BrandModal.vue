<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import {
  NModal,
  NUpload,
  NUploadDragger,
  NIcon,
  NForm,
  NFormItem,
  NInput,
  NButton,
  NSpin,
  FormInst,
} from "naive-ui";
import { useI18n } from "vue-i18n";
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
import apiClient from "@/helpers/apiClient";
import { cdnLink } from "@/helpers/cdn";
import useClipboard from "@/hooks/useClipboard";
import {
  H1Input,
  MetaTitleInput,
  MetaDescriptionInput,
} from "@/components/SeoInputs";
import { useBrandsStore, useBrandModalStore } from "@/stores/brands.store";

defineOptions({
  name: "BrandModal",
});

const brandsStore = useBrandsStore();
const brandModalStore = useBrandModalStore();
const { getImage } = useClipboard();
const brandForm = ref<FormInst>();

const { t } = useI18n();

const isImageLoading = ref(false);

const saveAction = async () => {
  await brandForm.value?.validate();
  await brandsStore.updateBrand();
};
const createAction = async () => {
  await brandForm.value?.validate();
  await brandsStore.createBrand();
};

const rules = {
  displayName: {
    required: true,
    message: "Назва бренду - обов'язкове поле",
  },
  slug: {
    required: true,
    message: "Slug не може бути пустим",
  },
};

const uploader = async (file) => {
  isImageLoading.value = true;
  const response = await apiClient.uploadFiles([file], "brands");
  brandModalStore.logo = response[0].path;
  isImageLoading.value = false;
};

const formUploadHandler = async ({ file }) => {
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

const onModalClose = () => {
  brandModalStore.$reset();
};

onMounted(() => {
  window.addEventListener("paste", pasteListener);
});

onBeforeUnmount(() => {
  window.removeEventListener("paste", pasteListener);
});
</script>

<template>
  <n-modal
    v-model:show="brandsStore.isModalOpen"
    :mask-closable="false"
    :title="
      brandsStore.isEdit
        ? `${t('edit')}: ${brandModalStore.displayName}`
        : `${t('add')} ${t('brand')}`
    "
    preset="card"
    class="max-w-xl"
    :on-before-leave="onModalClose"
  >
    <n-form
      ref="brandForm"
      :rules="rules"
      :model="brandModalStore"
      :disablad="brandsStore.isFetching"
    >
      <n-upload
        :on-change="formUploadHandler"
        :show-file-list="false"
        class="mb-4"
      >
        <n-upload-dragger class="relative">
          <div
            v-if="isImageLoading"
            class="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center"
          >
            <n-spin size="medium" />
          </div>
          <img
            v-if="brandModalStore.logo"
            :src="cdnLink(brandModalStore.logo, 'thumbnail')"
            :alt="brandModalStore.displayName"
            class="h-28 object-contain mx-auto"
          />
          <n-icon v-else size="48" :depth="3">
            <archive-icon />
          </n-icon>
        </n-upload-dragger>
      </n-upload>
      <n-form-item :label="t('title')" path="displayName">
        <n-input v-model:value="brandModalStore.displayName" />
      </n-form-item>
      <n-form-item label="Slug" path="slug">
        <n-input v-model:value="brandModalStore.slug" />
      </n-form-item>

      <H1Input v-model="brandModalStore.h1" />

      <MetaTitleInput v-model="brandModalStore.metaTitle" />

      <MetaDescriptionInput v-model="brandModalStore.metaDescription" />
    </n-form>
    <template #action>
      <div class="text-right">
        <n-button
          v-if="brandsStore.isEdit"
          type="primary"
          :loading="brandsStore.isFetching"
          @click="saveAction"
        >
          {{ t("save") }}
        </n-button>
        <n-button
          v-else
          type="primary"
          :loading="brandsStore.isFetching"
          @click="createAction"
        >
          {{ t("create") }}
        </n-button>
      </div>
    </template>
  </n-modal>
</template>
