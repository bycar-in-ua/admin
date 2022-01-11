<template>
  <n-data-table
    :columns="columns"
    :data="createData(cars)"
    :loading="cars.isFetching"
    :row-key="(row) => row.key"
    @update:checked-row-keys="handleCheck"
  />
  <div v-if="cars.pageCount > 1" class="flex justify-end my-4">
    <n-pagination
      :page-count="cars.pageCount"
      :page-size="cars.pageSize"
      :page="cars.page"
      @update:page="handlePagination"
    />
  </div>
</template>

<script>
export default {
  name: "VehiclesTable",
};
</script>

<script setup>
import { computed, h } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { NDataTable, NTag, NPagination } from "naive-ui";
import { useStore } from "vuex";
import { FETCH_CARS } from "@/store/modules/cars/actionTypes";
import { getStatusTag } from "@/helpers/postStatuses";
import { prepareCarTitle } from "@/helpers/preparers";
import TableRowActions from "./TableRowActions";

const store = useStore();
const router = useRouter();
const { t } = useI18n();

store.dispatch(FETCH_CARS);

const cars = computed(() => store.state.cars);

// const selectedRows = ref([]);

const createData = (cars) =>
  cars.items.map((car) => ({
    key: car.id,
    name: prepareCarTitle(car),
    status: car.status,
  }));

const createColumns = ({ editCallback }) => {
  return [
    // {
    //   type: "selection",
    // },
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
};

const columns = createColumns({
  editCallback(rowData) {
    router.push({ name: "EditVehicle", params: { id: rowData.key } });
  },
});

// const handleCheck = (rowKeys) => {
//   selectedRows.value = rowKeys;
// };

const handlePagination = (page) => {
  store.dispatch(FETCH_CARS, page);
};
</script>
