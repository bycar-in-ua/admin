<template>
  <div class="mb-6 flex">
    <n-button type="primary" class="mr-auto" @click="isModalOpen = true">
      {{ t("create") }}
    </n-button>
    <template v-if="selectedRows.length">
      <n-button
        type="error"
        class="ml-4"
        :loading="carsStore.isFetching"
        @click="hadleDelete('soft')"
      >
        {{ t("delete") }}
      </n-button>
      <n-button
        type="error"
        class="ml-4"
        :loading="carsStore.isFetching"
        @click="hadleDelete('hard')"
      >
        {{ t("hardDelete") }}
      </n-button>
    </template>
  </div>
  <n-data-table
    :columns="columns"
    :data="createData()"
    :loading="carsStore.isFetching"
    :row-key="(row) => row.key"
    @update:checked-row-keys="handleCheck"
  />
  <div
    v-if="carsStore.meta.totalPages && carsStore.meta.totalPages > 1"
    class="flex justify-end my-4"
  >
    <n-pagination
      :page-count="carsStore.meta.totalPages"
      :page-size="carsStore.meta.itemsPerPage"
      :page="carsStore.meta.currentPage"
      @update:page="handlePagination"
    />
  </div>
  <create-vehicle-modal v-model:show="isModalOpen" />
</template>

<script lang="ts">
export default {
  name: "VehiclesTable",
};
</script>

<script setup lang="ts">
import { h, ref } from "vue";
import { useI18n } from "vue-i18n";
import { NDataTable, NTag, NPagination, NButton } from "naive-ui";
import { getStatusTag } from "@/helpers/postStatuses";
import { prepareCarTitle } from "@/helpers/preparers";
import CreateVehicleModal from "./CreateVehicleModal.vue";
import TableRowActions from "./TableRowActions.vue";
import { useCarsStore } from "@/stores/cars.store";
import { TableColumn } from "naive-ui/lib/data-table/src/interface";

export interface IRowData {
  key: number;
  slug: string;
  name: string;
  status: string;
}

const carsStore = useCarsStore();
const { t } = useI18n();

carsStore.fetchCars();

const isModalOpen = ref(false);
const selectedRows = ref([]);

const createData = () =>
  carsStore.items.map(
    (car): IRowData => ({
      key: Number(car.id),
      slug: car.slug,
      name: prepareCarTitle(car),
      status: car.status,
    })
  );

const columns: TableColumn[] = [
  {
    type: "selection",
  },
  {
    title: t("vehicle.table.cols.name"),
    key: "name",
  },
  {
    title: t("vehicle.table.cols.status"),
    key: "status",
    render(row) {
      return h(
        NTag,
        {
          type: getStatusTag(row.status),
        },
        {
          default: t("vehicle.status." + row.status),
        }
      );
    },
  },
  {
    title: t("vehicle.table.cols.actions"),
    key: "actions",
    render(row) {
      return h(TableRowActions, {
        rowData: row,
      });
    },
  },
];

const handleCheck = (rowKeys) => {
  selectedRows.value = rowKeys;
};

const hadleDelete = async (type) => {
  await carsStore.deleteCars(type, selectedRows.value);
};

const handlePagination = (page) => {
  carsStore.fetchCars(page);
};
</script>
