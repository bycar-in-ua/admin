<template>
  <Users />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "UsersView",
});
</script>

<script setup lang="ts">
import Users from "@/components/Users/index.vue";
</script>
