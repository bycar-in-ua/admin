<template>
  <div class="grid grid-cols-4 gap-8">
    <div class="col-span-3">
      <n-skeleton text height="40px" :repeat="2" :sharp="false" />
      <n-skeleton text height="500px" :sharp="false" />
      <n-skeleton text height="40px" :repeat="5" :sharp="false" />
    </div>
    <div class="col-span-1">
      <n-skeleton text height="40px" :repeat="3" :sharp="false" />
    </div>
  </div>
</template>

<script>
import { NSkeleton } from "naive-ui";

export default {
  name: "VahicleEditorSkeleton",
  components: {
    NSkeleton,
  },
};
</script>
