<script setup lang="ts">
import { NForm, NFormItem, NInput, NCard, NButton } from "naive-ui";
import { cdnLink } from "@/helpers/cdn";
import { useDealerEditorStore } from "@/stores/dealerEditor.store";
import CarTitle from "@/components/common/CarTitle.vue";
import AddBrandsPopover from "./AddBrandsPopover.vue";

const dealerEditorStore = useDealerEditorStore();
</script>

<template>
  <NForm :model="dealerEditorStore.dealerEditorState">
    <NFormItem label="Назва дилера">
      <NInput v-model:value="dealerEditorStore.dealerEditorState.name" />
    </NFormItem>

    <NFormItem label="Локація">
      <NInput v-model:value="dealerEditorStore.dealerEditorState.location" />
    </NFormItem>

    <NCard title="Бренди" class="mb-6" content-class=" grid grid-cols-6 gap-4">
      <template #header-extra>
        <AddBrandsPopover />
      </template>

      <NCard
        v-for="brand in dealerEditorStore.dealer.brands"
        :key="brand.id"
        size="small"
        :title="brand.displayName"
      >
        <template #cover>
          <img :src="cdnLink(brand.logo, 'medium')" class="aspect-video object-contain" />
        </template>
      </NCard>
    </NCard>

    <NCard title="Авто в наявності" content-class="grid grid-cols-4 gap-4">
      <NCard
        v-for="car in dealerEditorStore.dealer.availableVehicles"
        :key="car.id"
        size="small"
        footer-class="flex justify-end"
      >
        <template #cover>
          <img :src="cdnLink(car.images?.[0]?.path ?? '', 'medium')" />
        </template>

        <template #header>
          <CarTitle :car="car.vehicle" />
        </template>

        <template #footer>
          <RouterLink
            :to="{ name: 'EditAvailableVehicle', params: { id: car.id } }"
            target="_blank"
          >
            <NButton type="primary" size="small"> Детальніше </NButton>
          </RouterLink>
        </template>
      </NCard>
    </NCard>
  </NForm>
</template>
