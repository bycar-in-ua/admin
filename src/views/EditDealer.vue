<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>Edit dealer {{ route.params.id }}</template>
