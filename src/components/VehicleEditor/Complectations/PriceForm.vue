<template>
  <n-form size="normal">
    <n-h5>Основные параметры</n-h5>
    <div class="grid grid-cols-3 gap-4">
      <n-form-item label="Двигатель">
        <n-select
          :options="[
            { value: 1, label: '2.0 Skyactiv' },
            { value: 2, label: '2.5 Skyactiv Turbo' },
          ]"
          size="small"
        />
      </n-form-item>
      <n-form-item label="Трансмиссия">
        <n-select
          :options="[
            { value: 1, label: '6 АКПП FWD' },
            { value: 2, label: '6 АКПП AWD' },
          ]"
          size="small"
        />
      </n-form-item>
      <n-form-item label="Цена">
        <!-- <n-input-number :show-button="false" v-model="price">
          <template #prefix> $ </template>
        </n-input-number> -->
      </n-form-item>
    </div>
  </n-form>
</template>

<script>
/* eslint-disable */
import { NH5, NForm, NFormItem, NSelect, NInputNumber } from "naive-ui";

export default {
  name: "PriceForm",
  data: () => ({
    price: 0
  }),
  components: {
    NH5,
    NFormItem,
    NForm,
    NSelect,
    NInputNumber
  }
};
</script>
