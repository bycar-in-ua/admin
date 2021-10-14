<template>
  <n-data-table
    :columns="columns"
    :data="createData(cars)"
    :pagination="pagination"
  />
</template>

<script>
import { computed, h } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { NDataTable, NButton, NTag } from "naive-ui";
import { useStore } from "vuex";
import { FETCH_CARS } from "@/store/modules/cars/actionTypes";
import { getStatusTag } from "@/helpers/postStatuses";

const createData = (cars) =>
  cars.map((car) => ({
    key: car.id,
    name: car.displayName,
    status: car.status,
  }));

export default {
  name: "VehiclesTable",
  setup() {
    const store = useStore();
    const router = useRouter();
    const { t } = useI18n();

    store.dispatch(FETCH_CARS);

    const cars = computed(() => store.state.cars.all);

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
            return h(
              NButton,
              {
                size: "small",
                onClick: () => editCallback(row),
              },
              { default: () => t("edit") }
            );
          },
        },
      ];
    };

    return {
      createData,
      cars,
      columns: createColumns({
        editCallback(rowData) {
          router.push({ name: "EditVehicle", params: { id: rowData.key } });
        },
      }),
      pagination: {
        pageSize: 10,
      },
    };
  },
  components: {
    NDataTable,
  },
};
</script>
