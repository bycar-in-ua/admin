<template>
  <n-form ref="formRef" :inline="true" class="mt-4">
    <n-form-item :label="t('options.addNew')" path="optionName">
      <n-input v-model:value="optionName" :placeholder="t('enter')" />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" :disabled="!optionName" @click="submitHandler">
        {{ t("add") }}
      </n-button>
    </n-form-item>
  </n-form>
</template>
<script>
export default {
  name: "AddNewOption",
};
</script>

<script setup>
import { ref, defineProps } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { NForm, NFormItem, NInput, NButton } from "naive-ui";
import { CREATE_OPTION } from "@/store/modules/library/actionTypes";

const store = useStore();
const { t } = useI18n();

const props = defineProps({
  categoryId: {
    type: Number,
    requierd: true,
  },
});

const optionName = ref("");

const submitHandler = async () => {
  await store.dispatch(CREATE_OPTION, [props.categoryId, optionName.value]);
  optionName.value = "";
};
</script>
