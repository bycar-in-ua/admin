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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TableRowActions",
});
</script>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { NButton, NSpace } from "naive-ui";
import { useCarsStore } from "@/stores/cars.store";
import { IRowData } from "./VehiclesTable.vue";

interface IProps {
  rowData: IRowData;
}

const props = defineProps<IProps>();

const { t } = useI18n();
const router = useRouter();
const carsStore = useCarsStore();

const editAction = () => {
  router.push({ name: "EditVehicle", params: { slug: props.rowData.slug } });
};

const duplicateAction = async () => {
  const newCar = await carsStore.duplicateCar(props.rowData.key);
  router.push({ name: "EditVehicle", params: { slug: newCar.slug } });
};
</script>
