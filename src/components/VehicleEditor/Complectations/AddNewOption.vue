<template>
  <n-form :model="formValue" ref="formRef" :rules="rules" :inline="true">
    <n-form-item label="Добавить новую опцию" path="optionName">
      <n-input v-model="optionName" />
    </n-form-item>
    <n-form-item>
      <n-button type="primary">立即创建</n-button>
    </n-form-item>
  </n-form>
</template>
<script>
export default {
  name: "AddNewOption",
};
</script>

<script setup>
import { ref } from "vue";
import { NForm, NFormItem, NInput, NButton } from "naive-ui";

const rules = {
  optionName: {
    required: true,
    message: "Это поле не может быть пустым",
    trigger: ["input", "blur"],
  },
};
const formValue = {
  optionName: ref(""),
};
</script>
