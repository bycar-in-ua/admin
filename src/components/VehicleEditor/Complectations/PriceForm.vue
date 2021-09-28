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
    </div>
  </n-form>
</template>

<script>
export default {
  name: "PriceForm",
};
</script>
<script setup>
import { NH5, NForm, NFormItem, NSelect } from "naive-ui";
</script>
