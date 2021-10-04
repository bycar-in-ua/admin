<template>
  <div class="flex">
    <n-input
      v-model:value="fieldModel"
      type="text"
      :disabled="!isEdit"
      ref="inputRef"
      class="mr-4"
    />
    <n-button-group v-if="isEdit">
      <n-button type="success" ghost title="Сохранить" @click="handleSave">
        <template #icon>
          <n-icon>
            <CheckmarkSharp />
          </n-icon>
        </template>
      </n-button>
      <n-button type="error" ghost title="Отменить" @click="handleDismiss">
        <template #icon>
          <n-icon>
            <CloseSharp />
          </n-icon>
        </template>
      </n-button>
    </n-button-group>
    <n-button
      v-else
      type="primary"
      ghost
      title="Редактировать название комплектации"
      @click="handleEditClick"
    >
      <template #icon>
        <n-icon>
          <PencilSharp />
        </n-icon>
      </template>
    </n-button>
  </div>
</template>
<script>
export default {
  name: "ComplectationTitleEditor",
};
</script>

<script setup>
import { defineProps, ref } from "vue";
import { useStore } from "vuex";
import { carEditorNamespace } from "@/store/modules/carEditor";
import { CHANGE_COMPLECTATION_NAME } from "@/store/modules/carEditor/actionTypes";
import { NInput, NButton, NButtonGroup, NIcon } from "naive-ui";
import { PencilSharp, CheckmarkSharp, CloseSharp } from "@vicons/ionicons5";

const props = defineProps({
  complectation: {
    type: Object,
    requierd: true,
  },
  complectationIndex: {
    type: Number,
    requierd: true,
  },
});

const store = useStore();

const isEdit = ref(false);
const inputRef = ref(null);
const fieldModel = ref(props.complectation.displayName);

const handleEditClick = () => {
  isEdit.value = true;
  setTimeout(() => {
    inputRef.value.focus();
  }, 0);
};

const handleDismiss = () => {
  isEdit.value = false;
  fieldModel.value = props.complectation.displayName;
};

const handleSave = () => {
  store.dispatch(carEditorNamespace(CHANGE_COMPLECTATION_NAME), [
    props.complectationIndex,
    fieldModel.value,
  ]);
  inputRef.value.blur();
  isEdit.value = false;
};
</script>
