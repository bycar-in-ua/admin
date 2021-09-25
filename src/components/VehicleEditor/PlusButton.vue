<template>
  <div
    class="
      shadow-lg
      rounded
      border border-gray-200
      flex
      justify-center
      items-center
      cursor-pointer
      transition-all
      hover:bg-gray-200
      p-8
    "
    @click="props.callback"
  >
    <n-icon size="40" :color="colors.primary.lighten1">
      <add-circle-outline />
    </n-icon>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { NIcon } from "naive-ui";
import { AddCircleOutline } from "@vicons/ionicons5";
import colors from "@/colors";

const props = defineProps({
  callback: {
    type: Function,
    required: true,
  },
});
</script>
