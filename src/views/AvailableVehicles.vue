<script setup lang="ts">
import { h, ref } from "vue";
import {
  type DataTableColumn,
  NButton,
  NDataTable,
  NPagination,
  NTag,
} from "naive-ui";
import { useQuery } from "@tanstack/vue-query";
import { format } from "date-fns";
import type { AvailableVehicle } from "@bycar-in-ua/sdk";
import { useI18n } from "vue-i18n";
import { useAvailableVehiclesService } from "@/AvailableVehicles";
import { getStatusTag } from "@/helpers/postStatuses";
import { RouterLink } from "vue-router";

const availableVehiclesService = useAvailableVehiclesService();
const { t } = useI18n();

const page = ref<number>(1);

const { data, isFetching } = useQuery({
  queryKey: ["dealers", page],
  queryFn: () => {
    return availableVehiclesService.searchAllAvailableVehicles({
      pagination: { page: page.value },
    });
  },
});

const columns: DataTableColumn<AvailableVehicle>[] = [
  {
    title: "ID",
    key: "id",
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
        () => t("vehicle.status." + row.status)
      );
    },
  },
  {
    title: "Назва",
    key: "name",
    render(rowData: AvailableVehicle) {
      const complectation = rowData?.vehicle?.complectations.find(
        (cmpl) => cmpl.id === rowData.complectationId
      );

      return `${rowData.vehicle?.brand?.displayName} ${rowData?.vehicle?.model} ${complectation?.displayName ?? ""}`;
    },
  },
  {
    title: "Дилер",
    key: "dealer",
    render(rowData: AvailableVehicle) {
      return rowData?.dealer?.name;
    },
  },
  {
    title: "Оновлено",
    key: "updatedAt",
    render(rowData: AvailableVehicle) {
      return format(rowData.updatedAt, "dd MM yyyy HH:mm");
    },
  },
  {
    key: "actions",
    title: "",
    className: "flex justify-end",
    render(rowData: AvailableVehicle) {
      return h(
        RouterLink,
        {
          to: {
            name: "EditAvailableVehicle",
            params: {
              id: rowData.id,
            },
          },
        },
        () =>
          h(
            NButton,
            {
              type: "primary",
              size: "small",
            },
            () => t("edit")
          )
      );
    },
  },
];
</script>

<template>
  <div>
    <NDataTable :columns :data="data?.items" :loading="isFetching" />
    <NPagination
      v-model:page="page"
      :page-count="data?.meta.totalPages"
      :page-size="data?.meta.itemsPerPage"
      class="mt-4 justify-end"
    />
  </div>
</template>
