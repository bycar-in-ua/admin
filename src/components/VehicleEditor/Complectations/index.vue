<template>
  <n-h3>Комплектации</n-h3>

  <n-collapse>
    <n-collapse-item
      v-for="cmpl in complectations"
      :key="cmpl.id"
      :name="cmpl.id"
    >
      <template #header>
        <n-h4 v-text="cmpl.displayName" class="font-bold m-0" />
      </template>
      <div class="p-4">
        <p>Тут будут какие-то характеристики</p>
        <n-h4>Цены</n-h4>
        <n-data-table
          :columns="columns"
          :paging="false"
          :data="data"
          size="small"
        />
      </div>
    </n-collapse-item>
  </n-collapse>
</template>

<script>
import { h } from "vue";
import { NH3, NH4, NCollapse, NCollapseItem, NDataTable } from "naive-ui";
import EngineSelect from "./EngineSelect";
import GearboxSelect from "./GearboxSelect";
import PriceInput from "./PriceInput";

const complectations = [
  {
    id: 1,
    displayName: "Sport",
  },
  {
    id: 2,
    displayName: "Touring",
  },
  {
    id: 3,
    displayName: "Grand Touring",
  },
];

const columns = [
  {
    title: "Двигатель",
    key: "engine",
    className: "w-2/5",
    render(row) {
      return h(EngineSelect, row);
    },
  },
  {
    title: "КПП",
    key: "gearbox",
    className: "w-2/5",
    render(row) {
      return h(GearboxSelect, row);
    },
  },
  {
    title: "Цена",
    key: "price",
    className: "w-1/5",
    render(row) {
      return h(PriceInput, {
        price: row.price,
      });
    },
  },
];

const data = [
  {
    engine: 1,
    gearbox: 1,
    price: 54564,
  },
  {
    engine: 1,
    gearbox: 1,
    price: 54564,
  },
];

export default {
  name: "Complectations",
  setup() {
    return {
      complectations,
      columns,
      data,
    };
  },
  components: {
    NH3,
    NH4,
    NCollapse,
    NCollapseItem,
    NDataTable,
  },
};
</script>
