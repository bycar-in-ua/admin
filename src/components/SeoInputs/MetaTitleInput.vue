<script setup lang="ts">
import { NFormItem, NInput } from "naive-ui";

const model = defineModel<string>();
</script>

<template>
  <NFormItem label="Meta-title" :show-feedback="true" feedback-class="mb-4">
    <NInput v-model:value="model" show-count />

    <template #feedback>
      Має бути унікальним, від 30 до 60 символів, використовувати ключові слова
    </template>
  </NFormItem>
</template>
