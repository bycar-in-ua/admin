<template>
  <n-list-item>
    <OptionEditor
      v-if="isEdit"
      :value="option.label"
      :positive-click="hadnleSave"
      :negative-click="hadleClose"
      :loading="isFetching"
    />
    <div v-else class="flex justify-between items-center">
      {{ option.label }}
      <n-icon class="cursor-pointer ml-auto" @click="isEdit = true">
        <PencilSharp />
      </n-icon>
      <n-icon class="cursor-pointer ml-2" @click="handleDelete">
        <CloseSharp />
      </n-icon>
    </div>
  </n-list-item>
</template>

<script>
export default {
  name: "OptionCategoryListItem",
};
</script>

<script setup>
import { defineProps, ref } from "vue";
import { useStore } from "vuex";
import { NListItem, NIcon } from "naive-ui";
import { PencilSharp, CloseSharp } from "@vicons/ionicons5";
import OptionEditor from "./OptionEditor";
import apiClient from "@/helpers/apiClient";
import { UPDATE_LIBRARY_ITEM } from "@/store/modules/library/mutationTypes";
import { DELETE_OPTION } from "@/store/modules/library/actionTypes";

const props = defineProps({
  option: Object,
});

const store = useStore();

const isEdit = ref(false);
const isFetching = ref(false);

const hadnleSave = async (val) => {
  isFetching.value = true;
  const updatedOption = await apiClient.put(`/options/${props.option.value}`, {
    displayName: val,
  });
  store.commit(UPDATE_LIBRARY_ITEM, ["options", updatedOption]);
  isEdit.value = false;
  isFetching.value = false;
};

const handleDelete = async () => {
  isFetching.value = true;
  await store.dispatch(DELETE_OPTION, props.option.value);
  isFetching.value = false;
};

const hadleClose = () => (isEdit.value = false);
</script>
