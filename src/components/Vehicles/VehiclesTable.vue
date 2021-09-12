<template>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" />
</template>

<script>
import { h } from "vue";
import { useRouter } from "vue-router";
import { NDataTable, NButton, NTag } from "naive-ui";

const createColumns = ({ editCallback }) => {
  return [
    {
      type: "selection",
    },
    {
      title: "Название",
      key: "name",
    },
    {
      title: "Статус",
      key: "status",
      render(row) {
        const statusTagsMap = {
          published: "success",
          draft: "warning",
        };

        return h(
          NTag,
          {
            type: statusTagsMap[row.status],
          },
          {
            default: () => row.status,
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

const createData = () => [
  {
    key: 0,
    name: "Audi A4",
    status: "published",
  },
  {
    key: 44,
    name: "Skoda Fabia",
    status: "published",
  },
  {
    key: 2,
    name: "Mazda 6",
    status: "published",
  },
];

export default {
  name: "VehiclesTable",
  setup() {
    const router = useRouter();
    return {
      data: createData(),
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
