<template>
  <n-modal
    v-model:show="show"
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
        v-for="category in optionCategories"
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

    <div class="px-8 pt-6">
      <add-new-option-category>
        <n-icon
          size="40"
          :color="colors.primary.lighten1"
          :title="t('options.addCategory')"
          class="cursor-pointer"
        >
          <add-circle-outline />
        </n-icon>
      </add-new-option-category>
    </div>
    <n-divider>{{ t("vehicle.powerUnits.title") }}</n-divider>
    <!-- <power-units-editor
      :complectation="complectation"
      :complectationIndex="index"
    /> -->
    <div class="px-8 pt-6">
      <n-icon
        size="40"
        :color="colors.primary.lighten1"
        :title="t('vehicle.powerUnits.addNew')"
        class="cursor-pointer"
        @click="createPowerUnit(index)"
      >
        <add-circle-outline />
      </n-icon>
    </div>
    <n-divider />
    <div class="flex mb-4">
      <n-checkbox
        :label="t('complectations.base')"
        class="mr-auto"
        :checked="complectation.base"
        :on-update:checked="baseCheckHandler(complectation.id)"
      />
    </div>

    <template #action>
      <div class="flex justify-end">
        <n-button
          type="error"
          size="medium"
          @click="deleteHandler(complectation.id)"
          class="mr-auto"
        >
          <template #icon> <CloseSharp /> </template>
          {{ t("complectations.delete") }}
        </n-button>
        <n-button
          type="primary"
          size="medium"
          class="ml-4"
          :disabled="!isEdited"
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
  data: () => ({
    show: false,
  }),
};
</script>

<script setup>
import { computed, ref } from "vue";
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
} from "naive-ui";
import { AddCircleOutline, CloseSharp, Copy } from "@vicons/ionicons5";
import AddNewOption from "@/components/common/AddNewOption.vue";
// import PowerUnitsEditor from "./PowerUnitsEditor";
import colors from "@/colors";
import { carEditorNamespace } from "@/store/modules/carEditor";
import {
  COPY_COMPLECTATION_DATA,
  CLEAN_UP_COMPLECTATION,
} from "@/store/modules/carEditor/complectation/actionTypes";
import { UPDATE_COMPLECTATION_FIELD } from "@/store/modules/carEditor/complectation/mutationTypes";
import {
  prepareOptionIdsByCategoties,
  prepareOption,
} from "@/helpers/preparers";

const store = useStore();
const { t } = useI18n();

const isEdited = ref(false);
const optionsTransferModelValue = ref({});

const complectation = computed(() => store.state.carEditor.complectation);
const optionCategories = computed(() => store.state.library.optionCategories);

const complectationsForCopy = computed(() =>
  store.state.carEditor.car.complectations.map((cmpl) => ({
    label: cmpl.displayName,
    value: cmpl.id,
    disabled: cmpl.id === complectation.value.id,
  }))
);

const getOptions = (options) => options.map((option) => prepareOption(option));

const complectationFieldUpdateHandler = (field) => (val) => {
  store.commit(carEditorNamespace(UPDATE_COMPLECTATION_FIELD), [field, val]);
  isEdited.value = true;
};

const optionsCopyHandler = (referenceComplectationId) => {
  store.dispatch(
    carEditorNamespace(COPY_COMPLECTATION_DATA),
    referenceComplectationId
  );
  isEdited.value = true;
};

const baseCheckHandler = (cmplId) => {
  console.log(cmplId);
};

const deleteHandler = (cmplId) => {
  console.log(cmplId);
};

const afterModalEnter = () => {
  optionsTransferModelValue.value = complectation.value.options.reduce(
    prepareOptionIdsByCategoties,
    {}
  );
};

const afterModalClose = () => {
  store.dispatch(carEditorNamespace(CLEAN_UP_COMPLECTATION));
  optionsTransferModelValue.value = {};
};
</script>

<style lang="scss">
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
