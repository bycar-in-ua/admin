<script setup lang="ts">
import {
  NButton,
  NForm,
  NFormItem,
  NSelect,
  NInputNumber,
  NCard,
  NIcon,
} from "naive-ui";
import { useI18n } from "vue-i18n";
import { Close, Add } from "@vicons/ionicons5";
import { useAddAvailableVehicle } from "../useAddAvailableVehicle";

defineEmits<{ cancel: [] }>();

const { t } = useI18n();

const {
  formState,

  brands,
  brandsFetching,
  onBrandUpdate,

  dealers,
  dealersFetching,

  cars,
  carsFetching,
  onVehicleUpdate,

  carFetching,

  complectations,
  onComplectationUpdate,

  powerUnits,

  createAvailableVehicle,
  createAvailableVehiclePending,
} = useAddAvailableVehicle();
</script>

<template>
  <NCard title="Додати авто в наявності" class="max-w-xl">
    <template #header-extra>
      <NButton quaternary @click="$emit('cancel')">
        <template #icon>
          <NIcon>
            <Close />
          </NIcon>
        </template>
      </NButton>
    </template>

    <NForm :model="formState">
      <NFormItem :label="t('brand')">
        <NSelect
          v-model:value="formState.brandId"
          :options="brands"
          value-field="id"
          label-field="displayName"
          filterable
          :loading="brandsFetching"
          @update:value="onBrandUpdate"
        />
      </NFormItem>

      <NFormItem label="Дилер">
        <NSelect
          v-model:value="formState.dealerId"
          :options="dealers"
          value-field="id"
          label-field="name"
          :disabled="!formState.brandId"
          :loading="dealersFetching"
        />
      </NFormItem>

      <NFormItem :label="t('vehicle.model')">
        <NSelect
          v-model:value="formState.vehicleId"
          :options="cars"
          value-field="id"
          label-field="model"
          :disabled="!formState.brandId || !formState.dealerId"
          :loading="carsFetching"
          @update:value="onVehicleUpdate"
        />
      </NFormItem>

      <NFormItem label="Комплектація">
        <NSelect
          v-model:value="formState.complectationId"
          :options="complectations"
          value-field="id"
          label-field="displayName"
          :disabled="!formState.vehicleId"
          :loading="carFetching"
          @update:value="onComplectationUpdate"
        />
      </NFormItem>

      <NFormItem label="Силова установка">
        <NSelect
          v-model:value="formState.powerUnitId"
          :options="powerUnits"
          value-field="id"
          label-field="displayName"
          :disabled="!formState.complectationId"
          :loading="carFetching"
        />
      </NFormItem>

      <NFormItem :label="t('price') + ' (грн)'">
        <NInputNumber
          v-model:value="formState.price"
          :disabled="!formState.powerUnitId"
          class="w-full"
        />
      </NFormItem>
    </NForm>

    <template #footer>
      <div class="flex justify-end gap-4">
        <NButton @click="$emit('cancel')">
          <template #icon>
            <NIcon>
              <Close />
            </NIcon>
          </template>

          {{ t("discard") }}
        </NButton>
        <NButton
          type="primary"
          :disabled="!formState.price"
          :loading="createAvailableVehiclePending"
          @click="() => createAvailableVehicle()"
        >
          <template #icon>
            <NIcon>
              <Add />
            </NIcon>
          </template>
          {{ t("create") }}
        </NButton>
      </div>
    </template>
  </NCard>
</template>
