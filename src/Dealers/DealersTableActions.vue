<script setup lang="ts">
import type { Dealer } from "@bycar-in-ua/sdk";
import { NButton, NSpace, NPopconfirm } from "naive-ui";
import { useMutation } from "@tanstack/vue-query";
import { useDealersService } from "./useDealersService";

const props = defineProps<{ dealer: Dealer }>();

const emit = defineEmits<{
  deleteSuccess: [Dealer];
}>();

const dealersService = useDealersService();

const { isPending, mutate } = useMutation({
  mutationKey: ["delete-dealer", props.dealer.id],
  mutationFn: () => {
    return dealersService.removeDealer(props.dealer.id);
  },
  onSuccess() {
    emit("deleteSuccess", props.dealer);
  },
});
</script>

<template>
  <NSpace justify="end">
    <RouterLink
      :to="{
        name: 'EditDealer',
        params: { id: props.dealer.id },
      }"
    >
      <NButton size="small" type="primary"> Редагувати </NButton>
    </RouterLink>
    <NPopconfirm
      positive-text="Видалити"
      negative-text="Скасувати"
      :loading="isPending"
      @positive-click="mutate"
    >
      <template #trigger>
        <NButton size="small" type="error" :loading="isPending">
          Видалити
        </NButton>
      </template>
      <div class="max-w-96">
        Ви впевнені, що хочете видалити дилера?<br />
        З видаленням дилера будуть видалені всі автомобілі в наявності, котрі
        були прив'язані до цього дилера
      </div>
    </NPopconfirm>
  </NSpace>
</template>
