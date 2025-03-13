<script setup lang="ts">
import { computed, ref, defineModel } from "vue";
import { useI18n } from "vue-i18n";
import {
  NModal,
  NCheckbox,
  NButton,
  NDivider,
  NIcon,
  NInput,
  NPopselect,
  NCollapse,
  NCollapseItem,
  NScrollbar,
  NTransfer,
  useNotification,
} from "naive-ui";
import type { SelectBaseOption } from "naive-ui/es/select/src/interface";
import { AddCircleOutline, Copy } from "@vicons/ionicons5";
import AddNewOption from "@/components/common/AddNewOption.vue";
import AddNewOptionCategory from "@/components/common/AddNewOptionCategory.vue";
import PowerUnitsEditor from "./PowerUnitsEditor.vue";
import {
  prepareOptionIdsByCategoties,
  prepareOption,
} from "@/helpers/preparers";
import { useComplectationStore } from "@/stores/vehicleEditor/complectation.store";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";
import { useOptionsStore } from "@/stores/options.store";

const show = defineModel<boolean>("show");

const vehicleStore = useVehicleStore();
const complectationStore = useComplectationStore();
const optionsStore = useOptionsStore();
const { t } = useI18n();
const notification = useNotification();

const isFetching = ref(false);
const optionsTransferModelValue = ref<{ [k: number]: number[] }>({});
const expandedPowerUnit = ref(null);
const powerUnitFetching = ref(false);

optionsStore.fetchOptionsByCategories();

const complectationsForCopy = computed<SelectBaseOption[]>(() =>
  vehicleStore.car.complectations.map((cmpl) => ({
    label: cmpl.displayName,
    value: cmpl.id,
    disabled: cmpl.id === complectationStore.id,
  }))
);

const getOptions = (options = []) =>
  options.map((option) => prepareOption(option));

const optionsCopyHandler = (referenceComplectationId) => {
  const referenceComplectation = vehicleStore.car.complectations.find(
    (cmpl) => cmpl.id === referenceComplectationId
  );
  complectationStore.options = referenceComplectation?.options;

  recalcOptions();
};

const createPowerUnit = async () => {
  try {
    powerUnitFetching.value = true;
    expandedPowerUnit.value = await complectationStore.createNewPowerUnit();
  } finally {
    powerUnitFetching.value = false;
  }
};

const saveHandler = async () => {
  try {
    isFetching.value = true;
    await complectationStore.saveComplectation(prepareOptionsForSaving());
    notification.success({
      title: t("notifications.complectation.saving.success"),
      duration: 5000,
    });
    show.value = false;
  } catch (error) {
    notification.error({
      title: t("notifications.error.title.default"),
      description: (error as Error).message,
      duration: 5000,
    });
  } finally {
    isFetching.value = false;
  }
};

const afterModalClose = () => {
  complectationStore.$reset();
  optionsTransferModelValue.value = {};
};

function prepareOptionsForSaving() {
  const options = [];

  for (const [catId, optionsIds] of Object.entries(
    optionsTransferModelValue.value
  )) {
    optionsStore.categories[catId].options.forEach((op) => {
      if (optionsIds.includes(op.id)) {
        options.push(op);
      }
    });
  }

  return options;
}

function recalcOptions() {
  optionsTransferModelValue.value = complectationStore.options?.reduce(
    prepareOptionIdsByCategoties,
    {}
  );
}
recalcOptions();
</script>

<template>
  <n-modal
    v-model:show="show"
    preset="card"
    :mask-closable="false"
    :title="complectationStore.displayName"
    class="max-w-5xl"
    @after-enter="recalcOptions"
    @after-leave="afterModalClose"
  >
    <n-scrollbar class="max-h-4/5 pr-4">
      <div class="flex">
        <n-input
          v-model:value="complectationStore.displayName"
          type="text"
          class="mr-4"
        />

        <n-popselect
          :options="complectationsForCopy"
          @update:value="optionsCopyHandler"
        >
          <n-button
            type="primary"
            ghost
            :title="t('complectations.copyOptions')"
          >
            <template #icon>
              <n-icon>
                <Copy />
              </n-icon>
            </template>
          </n-button>
        </n-popselect>
      </div>

      <n-divider>{{ t("options.title") }}</n-divider>

      <n-collapse accordion>
        <n-collapse-item
          v-for="category in Object.values(optionsStore.categories)"
          :key="category.id"
          :title="category.displayName"
          :name="category.id"
        >
          <n-transfer
            v-model:value="optionsTransferModelValue[category.id]"
            virtual-scroll
            filterable
            :options="getOptions(category.options)"
            size="large"
            class="options-transfer"
          />
          <add-new-option :category-id="category.id" form-class="mt-4" />
        </n-collapse-item>
      </n-collapse>

      <div class="pt-6">
        <add-new-option-category>
          <n-button tertiary :title="t('options.addCategory')">
            <template #icon>
              <n-icon>
                <add-circle-outline />
              </n-icon>
            </template>
            {{ t("options.addCategory") }}
          </n-button>
        </add-new-option-category>
      </div>

      <n-divider>{{ t("vehicle.powerUnits.title") }}</n-divider>

      <power-units-editor
        v-model:expanded-names="expandedPowerUnit"
        :power-units="complectationStore?.powerUnits || []"
      />

      <div class="pt-6">
        <n-button
          tertiary
          :loading="powerUnitFetching"
          :title="t('vehicle.powerUnits.addNew')"
          @click="createPowerUnit"
        >
          <template #icon>
            <n-icon>
              <add-circle-outline />
            </n-icon>
          </template>
          {{ t("vehicle.powerUnits.addNew") }}
        </n-button>
      </div>
      <n-divider />
      <div class="flex mb-4">
        <n-checkbox
          v-model:checked="complectationStore.base"
          :label="t('complectations.base')"
          class="mr-auto"
        />
      </div>
    </n-scrollbar>
    <template #action>
      <div class="flex justify-end">
        <n-button
          type="primary"
          size="medium"
          class="ml-4"
          :loading="isFetching"
          @click="saveHandler"
        >
          {{ t("save") }}
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<style>
.options-transfer {
  &.n-transfer {
    width: 100%;
    .n-transfer-list
      .n-transfer-list-body
      .n-transfer-list-flex-container
      .n-transfer-list-content
      .n-transfer-list-item {
      height: auto;
      max-height: 100%;
      @apply py-1;
    }
  }
}
</style>
