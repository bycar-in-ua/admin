<template>
  <n-modal
    :show="show"
    :on-after-enter="afterModalEnter"
    :on-after-leave="afterModalClose"
    preset="card"
    :mask-closable="false"
    :title="complectation.displayName"
    class="max-w-5xl"
  >
    <div class="flex">
      <n-input
        :value="complectation.displayName"
        :on-update:value="complectationFieldUpdateHandler('displayName')"
        type="text"
        class="mr-4"
      />

      <n-popselect
        :options="complectationsForCopy"
        @update:value="optionsCopyHandler"
      >
        <n-button type="primary" ghost :title="t('complectations.copyOptions')">
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
        v-for="category in Object.values(optionCategories)"
        :key="category.id"
        :title="category.displayName"
        :name="category.id"
      >
        <n-transfer
          virtual-scroll
          filterable
          :options="getOptions(category.options)"
          v-model:value="optionsTransferModelValue[category.id]"
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
      :power-units="complectation.powerUnits"
      v-model:expanded-names="expandedPowerUnit"
    />

    <div class="pt-6">
      <n-button
        tertiary
        @click="createPowerUnit"
        :loading="powerUnitFetching"
        :title="t('vehicle.powerUnits.addNew')"
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
        :label="t('complectations.base')"
        class="mr-auto"
        :checked="complectation.base"
        :on-update:checked="complectationFieldUpdateHandler('base')"
      />
    </div>

    <template #action>
      <div class="flex justify-end">
        <n-button
          type="error"
          size="medium"
          @click="deleteHandler"
          class="mr-auto"
          :loading="isFetching"
        >
          <template #icon> <CloseSharp /> </template>
          {{ t("complectations.delete") }}
        </n-button>
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

<script>
export default {
  name: "ComplectationModal",
};
</script>

<script setup>
import { computed, ref, defineEmits } from "vue";
import { useStore } from "vuex";
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
  NTransfer,
  useNotification,
} from "naive-ui";
import { AddCircleOutline, CloseSharp, Copy } from "@vicons/ionicons5";
import AddNewOption from "@/components/common/AddNewOption.vue";
import AddNewOptionCategory from "@/components/common/AddNewOptionCategory.vue";
import PowerUnitsEditor from "./PowerUnitsEditor";
import { carEditorNamespace } from "@/store/modules/carEditor";
import {
  COPY_COMPLECTATION_DATA,
  CLEAN_UP_COMPLECTATION,
  CREATE_NEW_POWER_UNIT,
  SAVE_COMPLECTATION,
  DELETE_COMPLECTATION,
} from "@/store/modules/carEditor/complectation/actionTypes";
import { UPDATE_COMPLECTATION_FIELD } from "@/store/modules/carEditor/complectation/mutationTypes";
import {
  prepareOptionIdsByCategoties,
  prepareOption,
} from "@/helpers/preparers";

const emit = defineEmits();
const store = useStore();
const { t } = useI18n();
const notification = useNotification();

const isFetching = ref(false);
const optionsTransferModelValue = ref({});
const expandedPowerUnit = ref(null);
const powerUnitFetching = ref(false);

const complectation = computed(() => store.state.carEditor.complectation);
const optionCategories = computed(() => store.state.library.options.categories);

const complectationsForCopy = computed(() =>
  store.state.carEditor.car.complectations.map((cmpl) => ({
    label: cmpl.displayName,
    value: cmpl.id,
    disabled: cmpl.id === complectation.value.id,
  }))
);

const getOptions = (options = []) =>
  options.map((option) => prepareOption(option));

const complectationFieldUpdateHandler = (field) => (val) => {
  store.commit(carEditorNamespace(UPDATE_COMPLECTATION_FIELD), [field, val]);
};

const optionsCopyHandler = (referenceComplectationId) => {
  store.dispatch(
    carEditorNamespace(COPY_COMPLECTATION_DATA),
    referenceComplectationId
  );
  recalcOptions();
};

const createPowerUnit = async () => {
  try {
    powerUnitFetching.value = true;
    expandedPowerUnit.value = await store.dispatch(
      carEditorNamespace(CREATE_NEW_POWER_UNIT)
    );
  } finally {
    powerUnitFetching.value = false;
  }
};

const saveHandler = async () => {
  try {
    isFetching.value = true;
    await store.dispatch(
      carEditorNamespace(SAVE_COMPLECTATION),
      prepareOptionsForSaving()
    );
    notification.success({
      title: t("notifications.complectation.saving.success"),
      duration: 5000,
    });
    emit("close-modal");
  } catch (error) {
    notification.error({
      title: t("notifications.error.title.default"),
      description: error.message,
      duration: 5000,
    });
  } finally {
    isFetching.value = false;
  }
};

const deleteHandler = async () => {
  try {
    isFetching.value = true;
    await store.dispatch(
      carEditorNamespace(DELETE_COMPLECTATION),
      complectation.value.id
    );
    notification.success({
      title: t("notifications.complectation.deleting.success"),
      duration: 5000,
    });
    emit("close-modal");
  } catch (error) {
    notification.error({
      title: t("notifications.error.title.default"),
      description: error.message,
      duration: 5000,
    });
  } finally {
    isFetching.value = false;
  }
};

const afterModalEnter = () => {
  recalcOptions();
};

const afterModalClose = () => {
  store.dispatch(carEditorNamespace(CLEAN_UP_COMPLECTATION));
  optionsTransferModelValue.value = {};
};

function prepareOptionsForSaving() {
  const options = [];

  for (const [catId, optionsIds] of Object.entries(
    optionsTransferModelValue.value
  )) {
    optionCategories.value[catId].options.forEach((op) => {
      if (optionsIds.includes(op.id)) {
        options.push(op);
      }
    });
  }

  return options;
}

function recalcOptions() {
  optionsTransferModelValue.value = complectation.value.options.reduce(
    prepareOptionIdsByCategoties,
    {}
  );
}
</script>

<style lang="postcss">
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
