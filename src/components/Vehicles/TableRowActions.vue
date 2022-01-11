<template>
  <n-space>
    <n-button type="primary" size="medium" @click="editAction">
      {{ t("edit") }}
    </n-button>
    <n-button type="primary" size="medium" @click="duplicateAction">
      {{ t("duplicate") }}
    </n-button>
  </n-space>
</template>

<script>
export default {
  name: "TableRowActions",
};
</script>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { NButton, NSpace } from "naive-ui";
import { DUPLICATE_CAR } from "@/store/modules/cars/actionTypes";

const props = defineProps({
  rowData: {
    type: Object,
    requierd: true,
  },
});

const { t } = useI18n();
const router = useRouter();
const store = useStore();

const editAction = () => {
  router.push({ name: "EditVehicle", params: { id: props.rowData.key } });
};

const duplicateAction = () => {
  store.dispatch(DUPLICATE_CAR, props.rowData.key);
};
</script>
