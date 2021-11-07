<template>
  <n-modal
    :show="show"
    preset="card"
    class="max-w-6xl"
    @update:show="closeCallback"
  >
    <Images :is-selectable="true" />
  </n-modal>
</template>

<script>
export default {
  name: "VehicleImagesModal",
};
</script>

<script setup>
import { defineProps } from "vue";
import { NModal } from "naive-ui";
import Images from "@/components/Images";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  closeCallback: {
    type: Function,
  },
});

const closeCallback = (val) => {
  props.closeCallback(val);
};
</script>
