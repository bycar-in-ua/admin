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
    :data="tableData"
    :loading="carsStore.isFetching"
    :row-key="(row) => row.key"
    @update:checked-row-keys="handleCheck"
    @update:filters="onFiltersUpdate"
  />
  <div
    v-if="carsStore.meta.totalPages && carsStore.meta.totalPages > 1"
    class="flex justify-end my-4"
  >
    <n-pagination
      :page-count="carsStore.meta.totalPages"
      :page-size="carsStore.meta.itemsPerPage"
      :page="carsStore.meta.currentPage"
      :page-sizes="[10, 15, 20, 25]"
      show-size-picker
      @update:page="handlePagination"
      @update:page-size="handlePageSize"
    />
  </div>
  <create-vehicle-modal v-model:show="isModalOpen" />
</template>

<script setup lang="ts">
import { h, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { PostStatus } from "@bycar-in-ua/common";
import type { DataTableColumns, DataTableFilterState } from "naive-ui";
import { NDataTable, NTag, NPagination, NButton } from "naive-ui";
import { getStatusTag } from "@/helpers/postStatuses";
import { prepareCarTitle } from "@/helpers/preparers";
import CreateVehicleModal from "./CreateVehicleModal.vue";
import TableRowActions from "./TableRowActions.vue";
import { useCarsStore } from "@/stores/cars.store";
import { useBrandsStore } from "@/stores/brands.store";

export interface IRowData {
  key: number;
  slug: string;
  brand: string;
  name: string;
  status: string;
}

const carsStore = useCarsStore();
const brandsStore = useBrandsStore();
const { t } = useI18n();

const isModalOpen = ref(false);
const selectedRows = ref([]);

const tableData = computed(() =>
  carsStore.items.map(
    (car): IRowData => ({
      key: Number(car.id),
      slug: car.slug,
      brand: car.brand.displayName,
      name: prepareCarTitle(car),
      status: car.status,
    })
  )
);

const brandsFiltersOptions = computed(() =>
  brandsStore.brands.map((brand) => ({
    label: brand.displayName,
    value: brand.id,
  }))
);

const onFiltersUpdate = (filters: DataTableFilterState) => {
  carsStore.setFilters({
    status: filters.status as string[],
    brand: filters.brand as number[],
  });
};

const columns: DataTableColumns<IRowData> = [
  {
    type: "selection",
  },
  {
    title: t("brand", 1),
    key: "brand",
    filter: true,
    filterMultiple: true,
    filterOptions: brandsFiltersOptions.value,
    render(row) {
      return row.brand;
    },
  },
  {
    title: t("vehicle.table.cols.name"),
    key: "name",
  },
  {
    title: t("vehicle.table.cols.status"),
    key: "status",
    filter: true,
    filterMultiple: true,
    filterOptions: [
      {
        label: "Чернетка",
        value: PostStatus.DRAFT,
      },
      {
        label: "Опубліковано",
        value: PostStatus.PUBLISHED,
      },
    ],
    render(row) {
      return h(
        NTag,
        {
          type: getStatusTag(row.status),
        },
        {
          default: () => t("vehicle.status." + row.status),
        }
      );
    },
  },
  {
    title: t("vehicle.table.cols.actions"),
    key: "actions",
    render(row) {
      // @ts-ignore
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

const handlePageSize = (pageSize: number) => {
  carsStore.meta.itemsPerPage = pageSize;
  carsStore.fetchCars(1);
};
</script>
