<template>
  <n-h3>Трансимиссии</n-h3>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <n-card v-for="i in 5" :key="i" title="5 АКПП" hoverable class="shadow-lg">
      <n-table :bordered="false" :single-line="false" size="small">
        <tbody>
          <tr>
            <td>Кол-во передач</td>
            <td>...</td>
          </tr>
          <tr>
            <td>Тип</td>
            <td>...</td>
          </tr>
          <tr>
            <td>Привод</td>
            <td>...</td>
          </tr>
        </tbody>
      </n-table>
      <template #action>
        <div class="text-right">
          <a href="#" class="text-primary">Редактировать</a>
        </div>
      </template>
    </n-card>
    <plus-button />
  </div>
</template>

<script setup>
import { NH3, NCard, NTable } from "naive-ui";
import PlusButton from "@/components/VehicleEditor/PlusButton";
</script>

<script>
export default {
  name: "Transmissions",
};
</script>
