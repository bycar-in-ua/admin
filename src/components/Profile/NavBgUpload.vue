<template>
  <n-thing title="Настройка фонового изображение навигации">
    <template #description> Текущее изображение: </template>
    <div class="">
      <img :src="navBgImage" class="max-w-3xl" />
    </div>
    <template #action>
      <n-upload :on-change="uploadHandler">
        <n-button>Загрузить новое изображение</n-button>
      </n-upload>
    </template>
  </n-thing>
</template>
<script>
export default {
  name: "NavBgUpload",
};
</script>

<script setup>
import useMemory from "@/hooks/useMemory";
import apiClient from "@/helpers/apiClient";
import { NUpload, NButton, NThing } from "naive-ui";
import { cdnLink } from "@/helpers/cdn";

const memory = useMemory();

const navBgImage = memory.get("navBgImage", null);

const uploadHandler = async (options) => {
  const response = await apiClient.uploadFiles(
    options.fileList.map((fileInfo) => fileInfo.file)
  );
  memory.set("navBgImage", cdnLink(response[0], 0, 1920));
  location.reload();
};
</script>
