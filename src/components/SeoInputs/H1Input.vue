<script setup lang="ts">
import { NFormItem, NInput } from "naive-ui";

const model = defineModel<string>();
</script>

<template>
  <NFormItem label="H1" :show-feedback="true" feedback-class="mb-4">
    <NInput v-model:value="model" show-count />

    <template #feedback>
      Має бути унікальним, до 70 символів, не дублювати meta-title,<br />
      відповідати тематиці сторінки та підходити за сенсом
    </template>
  </NFormItem>
</template>
