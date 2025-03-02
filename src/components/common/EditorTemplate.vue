<script setup lang="ts">
import { NScrollbar, NSkeleton } from "naive-ui";

defineProps<{ loading?: boolean }>();
</script>

<template>
  <div v-if="loading" class="grid grid-cols-4 gap-8">
    <div class="col-span-3">
      <n-skeleton text height="40px" :repeat="2" :sharp="false" />
      <n-skeleton text height="500px" :sharp="false" />
      <n-skeleton text height="40px" :repeat="5" :sharp="false" />
    </div>
    <div class="col-span-1">
      <n-skeleton text height="40px" :repeat="3" :sharp="false" />
    </div>
  </div>

  <div v-else class="flex gap-4 relative">
    <NScrollbar class="basis-3/4 pr-4" style="max-height: calc(100vh - 100px)">
      <slot />
    </NScrollbar>

    <div class="basis-1/4">
      <slot name="sidebar" />
    </div>
  </div>
</template>
