<template>
  <n-modal
    :show="isModalShowing"
    :on-update:show="closeModal"
    preset="card"
    :title="isEdit ? engine.displayName : 'Создание нового двигателя'"
    :mask-closable="false"
    class="max-w-3xl"
  >
    <n-form class="grid md:grid-cols-2 gap-4">
      <n-form-item label="Объем, куб. см.">
        <n-input-number
          :value="engine.displacement"
          class="w-full"
          :show-button="false"
          :on-update:value="inputHandler('displacement')"
        />
      </n-form-item>
      <n-form-item label="Система впрыска">
        <n-select
          :value="engine.injection"
          :options="injectionTypes"
          :on-update:value="inputHandler('injection')"
        />
      </n-form-item>
      <n-form-item label="Торговая марка">
        <n-input
          :value="engine.tradename"
          :on-update:value="inputHandler('tradename')"
        />
      </n-form-item>
      <n-form-item label="Производственный индекс">
        <n-input :on-update:value="inputHandler('manufactureIndex')" />
      </n-form-item>
      <n-form-item label="Тип топлива">
        <n-select
          :value="engine.fuelType"
          :options="fuelTypes"
          :on-update:value="inputHandler('fuelType')"
        />
      </n-form-item>
      <n-form-item label="Количество цилиндров">
        <n-input-number
          :value="engine.pistons"
          class="w-full"
          :show-button="false"
          :on-update:value="inputHandler('pistons')"
        />
      </n-form-item>
      <n-form-item label="Расположение цилиндров">
        <n-select
          :value="engine.pistonsPlacement"
          :options="pistonsPlacement"
          :on-update:value="inputHandler('pistonsPlacement')"
        />
      </n-form-item>
      <n-form-item label="Степень сжатия">
        <n-input-number
          :value="engine.compressionRatio"
          class="w-full"
          :show-button="false"
          :on-update:value="inputHandler('compressionRatio')"
        />
      </n-form-item>
      <n-form-item label="Мощность, кВт">
        <n-input-number
          :value="engine.power"
          class="w-full"
          :show-button="false"
          :on-update:value="inputHandler('power')"
        />
      </n-form-item>
      <n-form-item label="При каких оборотах">
        <n-input-number
          :value="engine.powerRPMfrom"
          class="w-full pr-1"
          :show-button="false"
          :on-update:value="inputHandler('powerRPMfrom')"
        >
          <template #prefix>От:</template>
        </n-input-number>
        <n-input-number
          :value="engine.powerRPMto"
          class="w-full pl-1"
          :show-button="false"
          :on-update:value="inputHandler('powerRPMto')"
        >
          <template #prefix>До:</template>
        </n-input-number>
      </n-form-item>
      <n-form-item label="Крутящий момент, Н/м">
        <n-input-number
          :value="engine.torque"
          class="w-full"
          :show-button="false"
          :on-update:value="inputHandler('torque')"
        />
      </n-form-item>
      <n-form-item label="При каких оборотах">
        <n-input-number
          :value="engine.torqueRPMfrom"
          class="w-full pr-1"
          :show-button="false"
          :on-update:value="inputHandler('torqueRPMfrom')"
        >
          <template #prefix>От:</template>
        </n-input-number>
        <n-input-number
          :value="engine.torqueRPMto"
          class="w-full pl-1"
          :show-button="false"
          :on-update:value="inputHandler('torqueRPMto')"
        >
          <template #prefix>До:</template>
        </n-input-number>
      </n-form-item>
      <div class="flex flex-col justify-center">
        <n-checkbox
          :checked="engine.turbo"
          label="Турбо"
          class="py-1"
          :on-update:checked="inputHandler('turbo')"
        />
        <n-checkbox
          :checked="engine.hybrid"
          label="Гибрид"
          class="py-1"
          :on-update:checked="inputHandler('hybrid')"
        />
      </div>
    </n-form>
    <template #action>
      <div class="text-right">
        <n-button v-if="isEdit" type="primary" @click="updateAction">
          Обновить
        </n-button>
        <n-button v-else type="primary" @click="createAction">Создать</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import {
  NModal,
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NInputNumber,
  NCheckbox,
  NButton,
} from "naive-ui";
import { carEditorNamespace } from "@/store/modules/carEditor";
import {
  UPDATE_ENGINE_FIELD,
  UPDATE_ENGINE_MODAL_OPEN,
} from "@/store/modules/carEditor/engine/mutationTypes";
import {
  CREATE_NEW_ENGINE,
  EDIT_ENGINE,
} from "@/store/modules/carEditor/engine/actionTypes";

const store = useStore();

const isModalShowing = computed(
  () => store.state.carEditor.engine.isEngineModalOpen
);
const isEdit = computed(
  () => store.getters[carEditorNamespace("isEngineEdit")]
);

const closeModal = (val) => {
  store.commit(carEditorNamespace(UPDATE_ENGINE_MODAL_OPEN), val);
};

const injectionTypes = [
  {
    value: "-",
    label: "-",
  },
  {
    value: "direct",
    label: "Непосредственный впрыск",
  },
  {
    value: "distributed",
    label: "Распределенный впрыск",
  },
  {
    value: "mono",
    label: "Моновпрыск",
  },
];

const fuelTypes = [
  {
    value: "gas",
    label: "Бензин",
  },
  {
    value: "dt",
    label: "Дизель",
  },
  {
    value: "lpg",
    label: "Газ",
  },
];

const pistonsPlacement = [
  {
    value: "-",
    label: "-",
  },
  {
    value: "R",
    label: "Рядное",
  },
  {
    value: "V",
    label: "V-образное",
  },
  {
    value: "W",
    label: "W-образное",
  },
  {
    value: "H",
    label: "Оппозитное",
  },
];

const engine = computed(() => store.state.carEditor.engine.engine);

const inputHandler = (field) => (val) => {
  store.commit(carEditorNamespace(UPDATE_ENGINE_FIELD), [field, val]);
};

const createAction = () =>
  store.dispatch(carEditorNamespace(CREATE_NEW_ENGINE));

const updateAction = () => {
  store.dispatch(carEditorNamespace(EDIT_ENGINE));
};
</script>
