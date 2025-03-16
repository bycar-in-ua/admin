<script setup lang="ts">
import { NFormItem, NInput } from "naive-ui";

const model = defineModel<string>();
</script>

<template>
  <NFormItem
    label="Meta-description"
    :show-feedback="true"
    feedback-class="mb-4"
  >
    <NInput type="textarea" v-model:value="model" show-count />

    <template #feedback>
      Має бути унікальним, від 120 до 160 символів, використовувати ключові
      слова, має спонукати користувача до дії
    </template>
  </NFormItem>
</template>
