<script setup lang="ts">
import { ref } from "vue";
import { NFormItem, NInput } from "naive-ui";
import AIButton from "@/components/common/AIButton.vue";

const model = defineModel<string>();

const props = defineProps<{
  generate?: () => Promise<void>;
}>();

const loading = ref(false);

const generateAction = async () => {
  loading.value = true;

  try {
    await props.generate?.();
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <NFormItem label="H1" :show-feedback="true" feedback-class="mb-4">
    <NInput v-model:value="model" show-count />

    <AIButton
      v-if="generate"
      quaternary
      style="margin-left: 8px"
      @click="generateAction"
      :loading="loading"
    />

    <template #feedback>
      Має бути унікальним, до 70 символів, не дублювати meta-title, відповідати
      тематиці сторінки та підходити за сенсом
    </template>
  </NFormItem>
</template>
