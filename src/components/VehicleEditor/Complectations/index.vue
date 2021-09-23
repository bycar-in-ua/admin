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
        <n-collapse>
          <n-collapse-item title="2.0 Skyactiv - 6 АКПП - $35000" name="1">
            <price-form />
          </n-collapse-item>

          <n-collapse-item title="2.5 Skyactiv - 6 АКПП - $38000" name="2">
            <price-form />
          </n-collapse-item>
        </n-collapse>
      </div>
    </n-collapse-item>
  </n-collapse>
</template>

<script>
import { NH3, NH4, NCollapse, NCollapseItem } from "naive-ui";
import PriceForm from "./PriceForm";

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

export default {
  name: "Complectations",
  setup() {
    return {
      complectations,
    };
  },
  components: {
    NH3,
    NH4,
    NCollapse,
    NCollapseItem,
    PriceForm,
  },
};
</script>
