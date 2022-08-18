<template>
  <n-modal
    v-model:show="brandsStore.isModalOpen"
    :mask-closable="false"
    :title="
      brandsStore.isEdit
        ? `Редактирование: ${brandModalStore.displayName}`
        : 'Добавление нового бренда'
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
            :src="cdnLink(brandModalStore.logo, 300)"
            :alt="brandModalStore.displayName"
            class="h-28 object-contain mx-auto"
          />
          <n-icon v-else size="48" :depth="3">
            <archive-icon />
          </n-icon>
        </n-upload-dragger>
      </n-upload>
      <n-form-item label="Название бренда" path="displayName">
        <n-input
          v-model:value="brandModalStore.displayName"
          placeholder="Введите название"
        />
      </n-form-item>
      <n-form-item label="Slug" path="slug">
        <n-input v-model:value="brandModalStore.slug" />
      </n-form-item>
    </n-form>
    <template #action>
      <div class="text-right">
        <n-button
          v-if="brandsStore.isEdit"
          type="primary"
          :disablad="brandsStore.isFetching"
          @click="saveAction"
        >
          Сохранить
        </n-button>
        <n-button
          v-else
          type="primary"
          :disablad="brandsStore.isFetching"
          @click="createAction"
        >
          Создать
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BrandModal",
});
</script>

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
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
import apiClient from "@/helpers/apiClient";
import { cdnLink } from "@/helpers/cdn";
import useClipboard from "@/hooks/useClipboard";
import { useBrandsStore, useBrandModalStore } from "@/stores/brands.store";

const brandsStore = useBrandsStore();
const brandModalStore = useBrandModalStore();
const { getImage } = useClipboard();
const brandForm = ref<FormInst>();

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
    message: "Название бренда - это обязательное поле",
  },
  slug: {
    required: true,
    message: "Slug - не может быть пустым",
  },
};

const uploader = async (file) => {
  isImageLoading.value = true;
  const response = await apiClient.uploadFiles([file], "brands");
  brandModalStore.logo = response[0];
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
