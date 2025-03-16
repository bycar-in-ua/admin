<template>
  <n-space>
    <RouterLink :to="{ name: 'EditVehicle', params: { slug: rowData.slug } }">
      <n-button type="primary" size="medium">
        {{ t("edit") }}
      </n-button>
    </RouterLink>
    <n-button type="primary" size="medium" @click="duplicateAction">
      {{ t("duplicate") }}
    </n-button>
  </n-space>
</template>

<script setup lang="ts">
import { useRouter, RouterLink } from "vue-router";
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

const duplicateAction = async () => {
  const newCar = await carsStore.duplicateCar(props.rowData.key);
  router.push({ name: "EditVehicle", params: { slug: newCar.slug } });
};
</script>
