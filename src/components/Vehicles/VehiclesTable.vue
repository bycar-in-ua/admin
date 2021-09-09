<template>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" />
</template>

<script>
import { h } from "vue";
import { NDataTable, NButton, NTag } from "naive-ui";

const createColumns = ({ sendMail }) => {
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
            onClick: () => sendMail(row),
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
    key: 1,
    name: "BMW 520d",
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
    return {
      data: createData(),
      columns: createColumns({
        sendMail(rowData) {
          console.log("send mail to " + rowData.name);
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
