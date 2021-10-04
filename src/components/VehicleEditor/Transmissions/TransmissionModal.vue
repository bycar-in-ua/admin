<template>
  <n-modal
    :show="isModalShowing"
    :on-update:show="closeModal"
    preset="card"
    :title="isEdit ? transmission.displayName : 'Создание новой трансмиссии'"
    :mask-closable="false"
    class="max-w-3xl"
  >
    <n-form class="grid md:grid-cols-2 gap-4">
      <n-form-item label="Привод">
        <n-select
          :value="transmission.drive"
          :options="driveTypes"
          :on-update:value="inputHandler('drive')"
        />
      </n-form-item>
      <n-form-item label="Технология привода">
        <n-input
          :value="transmission.driveName"
          :on-update:value="inputHandler('driveName')"
        />
      </n-form-item>
      <n-form-item label="Передняя подвеска">
        <n-input
          :value="transmission.suspensionTypeFront"
          :on-update:value="inputHandler('suspensionTypeFront')"
        />
      </n-form-item>
      <n-form-item label="Задняя подвеска">
        <n-input
          :value="transmission.suspensionTypeRear"
          :on-update:value="inputHandler('suspensionTypeRear')"
        />
      </n-form-item>
      <n-form-item label="Тормозная система, передняя ось">
        <n-input
          :value="transmission.brakingSystemTypeFront"
          :on-update:value="inputHandler('brakingSystemTypeFront')"
        />
      </n-form-item>
      <n-form-item label="Тормозная система, задняя ось">
        <n-input
          :value="transmission.brakingSystemTypeRear"
          :on-update:value="inputHandler('brakingSystemTypeRear')"
        />
      </n-form-item>

      <n-h4 class="md:col-span-2 mt-0">КПП</n-h4>
      <n-form-item label="Тип КПП">
        <n-select
          :value="transmission.gearbox.type"
          :options="gearboxTypes"
          :on-update:value="inputHandler('gearbox.type')"
        />
      </n-form-item>
      <n-form-item label="Количество передач">
        <n-input-number
          :value="transmission.gearbox.numberOfGears"
          class="w-full"
          :show-button="false"
          :on-update:value="inputHandler('gearbox.numberOfGears')"
        />
      </n-form-item>
      <n-form-item label="Название технологии">
        <n-input
          :value="transmission.gearbox.technology"
          :on-update:value="inputHandler('gearbox.technology')"
        />
      </n-form-item>
      <n-form-item label="Производственный индекс">
        <n-input
          :value="transmission.gearbox.manufactureIndex"
          :on-update:value="inputHandler('gearbox.manufactureIndex')"
        />
      </n-form-item>
      <n-form-item label="Производитель">
        <n-input
          :value="transmission.gearbox.made"
          :on-update:value="inputHandler('gearbox.made')"
        />
      </n-form-item>
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
  NButton,
  NH4,
} from "naive-ui";
import { carEditorNamespace } from "@/store/modules/carEditor";
import {
  UPDATE_TRANSMISSION_FIELD,
  UPDATE_TRANSMISSION_MODAL_OPEN,
} from "@/store/modules/carEditor/transmission/mutationTypes";
import {
  CREATE_NEW_TRANSMISSION,
  EDIT_TRANSMISSION,
} from "@/store/modules/carEditor/transmission/actionTypes";
import { driveTypes, gearboxTypes } from "@/helpers/transmissionHelpers";

const store = useStore();

const isModalShowing = computed(
  () => store.state.carEditor.transmission.isTransmissionModalOpen
);
const isEdit = computed(
  () => store.getters[carEditorNamespace("isTransmissionEdit")]
);

const closeModal = (val) => {
  store.commit(carEditorNamespace(UPDATE_TRANSMISSION_MODAL_OPEN), val);
};

const transmission = computed(
  () => store.state.carEditor.transmission.transmission
);

const inputHandler = (field) => (val) => {
  store.commit(carEditorNamespace(UPDATE_TRANSMISSION_FIELD), [field, val]);
};

const createAction = () =>
  store.dispatch(carEditorNamespace(CREATE_NEW_TRANSMISSION));

const updateAction = () => {
  store.dispatch(carEditorNamespace(EDIT_TRANSMISSION));
};
</script>
