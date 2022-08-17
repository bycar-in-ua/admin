<template>
  <div
    class="shadow-lg rounded border border-gray-300 flex justify-center items-center cursor-pointer transition-all hover:bg-gray-300 p-8"
    @click="callback"
  >
    <n-icon size="40" :color="colors.primary.lighten1">
      <add-circle-outline />
    </n-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PlusButton",
});
</script>

<script setup lang="ts">
import { NIcon } from "naive-ui";
import { AddCircleOutline } from "@vicons/ionicons5";
import colors from "@/colors.json";

interface IProps {
  callback: () => unknown;
}

defineProps<IProps>();
</script>
