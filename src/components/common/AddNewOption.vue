<template>
  <n-form
    :inline="true"
    :class="formClass"
    :show-feedback="showFeedback"
    :disabled="isFetching"
  >
    <n-form-item
      :label="t('options.addNew')"
      path="optionName"
      :class="formItemClass"
    >
      <n-input v-model:value="optionName" :placeholder="t('enter')" />
    </n-form-item>
    <n-form-item>
      <n-button
        type="primary"
        :disabled="!optionName"
        :loading="isFetching"
        @click="submitHandler"
      >
        {{ t("add") }}
      </n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AddNewOption",
});
</script>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { NForm, NFormItem, NInput, NButton } from "naive-ui";
import { useOptionsStore } from "@/stores/options.store";

const optionsStore = useOptionsStore();
const { t } = useI18n();

const props = defineProps({
  categoryId: {
    type: Number,
    requierd: true,
  },
  formClass: String,
  formItemClass: String,
  showFeedback: {
    type: Boolean,
    default: true,
  },
});

const optionName = ref("");
const isFetching = ref(false);

const submitHandler = async () => {
  try {
    isFetching.value = true;
    await optionsStore.createOption(props.categoryId, optionName.value);
    optionName.value = "";
  } finally {
    isFetching.value = false;
  }
};
</script>
