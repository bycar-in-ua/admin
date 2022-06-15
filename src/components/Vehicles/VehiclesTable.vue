<template>
  <div class="mb-6 flex">
    <n-button
      type="primary"
      class="mr-auto"
      @click="isModalOpen = true"
    >
      {{ t("create") }}
    </n-button>
    <template v-if="selectedRows.length">
      <n-button
        type="error"
        class="ml-4"
        :loading="cars.isFetching"
        @click="hadleDelete('soft')"
      >
        {{ t("delete") }}
      </n-button>
      <n-button
        type="error"
        class="ml-4"
        :loading="cars.isFetching"
        @click="hadleDelete('hard')"
      >
        {{ t("hardDelete") }}
      </n-button>
    </template>
  </div>
  <n-data-table
    :columns="columns"
    :data="createData(cars)"
    :loading="cars.isFetching"
    :row-key="(row) => row.key"
    @update:checked-row-keys="handleCheck"
  />
  <div
    v-if="cars.pageCount > 1"
    class="flex justify-end my-4"
  >
    <n-pagination
      :page-count="cars.pageCount"
      :page-size="cars.pageSize"
      :page="cars.page"
      @update:page="handlePagination"
    />
  </div>
  <create-vehicle-modal v-model:show="isModalOpen" />
</template>

<script>
export default {
  name: "VehiclesTable",
};
</script>

<script setup>
import { computed, h, ref } from "vue";
import { useI18n } from "vue-i18n";
import { NDataTable, NTag, NPagination, NButton } from "naive-ui";
import { useStore } from "vuex";
import { DELETE_CARS, FETCH_CARS } from "@/store/modules/cars/actionTypes";
import { getStatusTag } from "@/helpers/postStatuses";
import { prepareCarTitle } from "@/helpers/preparers";
import CreateVehicleModal from "./CreateVehicleModal";
import TableRowActions from "./TableRowActions";

const store = useStore();
const { t } = useI18n();

store.dispatch(FETCH_CARS);

const cars = computed(() => store.state.cars);

const isModalOpen = ref(false);
const selectedRows = ref([]);

const createData = (cars) =>
  cars.items.map((car) => ({
    key: car.id,
    slug: car.slug,
    name: prepareCarTitle(car),
    status: car.status,
  }));

const columns = [
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
  await store.dispatch(DELETE_CARS, [type, selectedRows.value]);
};

const handlePagination = (page) => {
  store.dispatch(FETCH_CARS, page);
};
</script>
