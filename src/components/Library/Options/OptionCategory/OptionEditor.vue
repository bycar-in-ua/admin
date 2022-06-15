<template>
  <n-input-group>
    <n-input
      v-model:value="inputModel"
      :loading="loading"
      :disabled="loading"
    />
    <n-button
      ghost
      :title="t('discard')"
      :disabled="loading"
      @click="negativeClick"
    >
      <template #icon>
        <n-icon><Close /></n-icon>
      </template>
    </n-button>
    <n-button
      ghost
      :title="t('save')"
      :disabled="loading"
      @click="positiveClick(inputModel)"
    >
      <template #icon>
        <n-icon><Checkmark /></n-icon>
      </template>
    </n-button>
  </n-input-group>
</template>

<script>
export default {
  name: "OptionEditor",
};
</script>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { NInput, NInputGroup, NButton, NIcon } from "naive-ui";
import { Checkmark, Close } from "@vicons/ionicons5";

const props = defineProps({
  value: String,
  positiveClick: Function,
  negativeClick: Function,
  loading: Boolean,
});

const { t } = useI18n();

const inputModel = ref(props.value);
</script>
