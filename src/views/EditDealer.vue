<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { useRoute } from "vue-router";
import { useDealersService } from "@/Dealers";

const route = useRoute();

const dealersService = useDealersService();

const { data: dealer } = useQuery({
  queryKey: ["dealer", route.params.id],
  queryFn: () => {
    return dealersService.getDealer(Number(route.params.id));
  },
});
</script>

<template>
  <pre>{{ dealer }}</pre>
</template>
