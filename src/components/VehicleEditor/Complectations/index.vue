<template>
  <n-card :title="t('complectations.title')" size="small" class="my-4 shadow">
    <n-collapse>
      <n-collapse-item
        v-for="(complectation, index) in complectations"
        :key="complectation.id"
        :name="complectation.id"
      >
        <template #header class="jkbkk">
          <n-h4
            v-text="complectation.displayName"
            :complectationIndex="index"
            class="font-bold m-0"
          />
        </template>
        <div class="p-4 shadow-lg">
          <complectation-title-editor
            :complectation="complectation"
            :complectationIndex="index"
          />
          <n-divider>{{ t("options.title") }}</n-divider>
          <options-editor
            :complectation="complectation"
            :complectationIndex="index"
          />
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
          <power-units-editor
            :complectation="complectation"
            :complectationIndex="index"
          />
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
            <n-button
              type="error"
              size="medium"
              @click="deleteHandler(complectation.id)"
              :loading="isFetching"
              :disabled="isFetching"
            >
              <template #icon> <CloseSharp /> </template>
              {{ t("complectations.delete") }}
            </n-button>
          </div>
        </div>
      </n-collapse-item>
    </n-collapse>
    <n-divider>
      <n-popconfirm
        :show-icon="false"
        :positive-text="t('complectations.addNew')"
        :negative-text="t('discard')"
        @positive-click="createComplectation"
      >
        <template #trigger>
          <n-icon
            size="40"
            :color="colors.primary.lighten1"
            :title="t('complectations.addNew')"
            class="cursor-pointer"
          >
            <add-circle-outline />
          </n-icon>
        </template>

        <n-input
          v-model:value="newComplectationName"
          type="text"
          :placeholder="t('complectations.enterName')"
        />
      </n-popconfirm>
    </n-divider>
  </n-card>
</template>

<script>
export default {
  components: { AddNewOptionCategory },
  name: "Complectations",
};
</script>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import colors from "@/colors";
import {
  NCard,
  NH4,
  NCollapse,
  NCollapseItem,
  NDivider,
  NIcon,
  NPopconfirm,
  NInput,
  NCheckbox,
  NButton,
} from "naive-ui";
import { AddCircleOutline, CloseSharp } from "@vicons/ionicons5";
import OptionsEditor from "./OptionsEditor";
import ComplectationTitleEditor from "./ComplectationTitleEditor";
import PowerUnitsEditor from "./PowerUnitsEditor";
import AddNewOptionCategory from "@/components/common/AddNewOptionCategory";
import { carEditorNamespace } from "@/store/modules/carEditor";
import {
  CREATE_NEW_COMPLECTATION,
  DELETE_COMPLECTATION,
} from "@/store/modules/carEditor/actionTypes";
import {
  PUSH_NEW_POWER_UNIT,
  SET_DEFAULT_COMPLECTATION,
} from "@/store/modules/carEditor/mutationTypes";

const store = useStore();
const { t } = useI18n();

const complectations = computed(() => store.state.carEditor.car.complectations);

const isFetching = ref(false);
const newComplectationName = ref("");

const baseCheckHandler = (cmplId) => (val) => {
  if (val) {
    store.commit(carEditorNamespace(SET_DEFAULT_COMPLECTATION), cmplId);
    return;
  }
  store.commit(carEditorNamespace(SET_DEFAULT_COMPLECTATION), false);
};

const createComplectation = async () => {
  await store.dispatch(
    carEditorNamespace(CREATE_NEW_COMPLECTATION),
    newComplectationName.value
  );
  newComplectationName.value = "";
};

const createPowerUnit = (complectationIndex) =>
  store.commit(carEditorNamespace(PUSH_NEW_POWER_UNIT), complectationIndex);

const deleteHandler = async (complectationId) => {
  try {
    isFetching.value = true;
    await store.dispatch(
      carEditorNamespace(DELETE_COMPLECTATION),
      complectationId
    );
  } finally {
    isFetching.value = false;
  }
};
</script>
