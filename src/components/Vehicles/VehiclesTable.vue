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
import { NDataTable, NButton, NTag } from "naive-ui";
import { useStore } from "vuex";
import { FETCH_CARS } from "@/store/modules/cars/actionTypes";
import { getStatusTag, getStatusLabel } from "@/helpers/postStatuses";

const createColumns = ({ editCallback }) => {
  return [
    // {
    //   type: "selection",
    // },
    {
      title: "Название",
      key: "name",
    },
    {
      title: "Статус",
      key: "status",
      render(row) {
        return h(
          NTag,
          {
            type: getStatusTag(row.status),
          },
          {
            default: getStatusLabel(row.status),
          }
        );
      },
    },
    {
      title: "Действия",
      key: "actions",
      render(row) {
        return h(
          NButton,
          {
            size: "small",
            onClick: () => editCallback(row),
          },
          { default: () => "Редактировать" }
        );
      },
    },
  ];
};

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

    store.dispatch(FETCH_CARS);

    const cars = computed(() => store.state.cars.all);

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
