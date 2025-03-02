<script setup lang="ts">
import { h, ref } from "vue";
import { type DataTableColumn, NDataTable, NPagination } from "naive-ui";
import { useQuery } from "@tanstack/vue-query";
import { type Dealer } from "@bycar-in-ua/sdk";
import { useDealersService, DealersTableActions } from "@/Dealers";

const dealersService = useDealersService();

const page = ref<number>(1);

const { data, isFetching, refetch } = useQuery({
  queryKey: ["dealers", page],
  queryFn: () => {
    return dealersService.searchDealers({
      pagination: { page: page.value },
    });
  },
});

const columns: DataTableColumn<Dealer>[] = [
  {
    title: "ID",
    key: "id",
  },
  {
    title: "Назва дилера",
    key: "name",
  },
  {
    title: "Локація",
    key: "location",
  },
  {
    key: "actions",
    title: "",
    render(rowData) {
      return h(DealersTableActions, {
        dealer: rowData,
        onDeleteSuccess: () => {
          refetch();
        },
      });
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
