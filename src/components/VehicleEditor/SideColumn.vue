<template>
  <n-form :model="car" :rules="rules">
    <div class="text-right mb-4">
      <n-button type="primary" @click="saveAction" :disabled="!isEdited">
        <template v-if="isFetching">
          <n-spin size="small" stroke="white" />
        </template>
        <template v-else> Сохранить </template>
      </n-button>
    </div>
    <n-form-item label="Статус">
      <n-select
        size="medium"
        :value="car.status"
        :options="statusOptions"
        :on-update:value="updateCarField('status')"
      />
    </n-form-item>
    <n-form-item label="Бренд" required>
      <n-select
        size="medium"
        disabled
        :value="car.brand"
        :renderLabel="renderBrandLabel"
      />
    </n-form-item>
    <n-form-item label="Модель" path="model">
      <n-input
        type="text"
        :value="car.model"
        :on-update:value="updateCarField('model')"
        placeholder="Введите название модели"
      />
    </n-form-item>
    <n-form-item label="Модельный год" path="year">
      <n-input-number
        :show-button="false"
        class="w-full"
        :value="car.year"
        placeholder="Введите модельный год"
        :on-update:value="updateCarField('year')"
      />
    </n-form-item>
  </n-form>
</template>

<script>
export default {
  name: "SideColumn",
};
</script>

<script setup>
import { h, computed } from "vue";
import { useStore } from "vuex";

import { yearValidator } from "@/helpers/validators";
import { carEditorNamespace } from "@/store/modules/carEditor";
import { UPDATE_CAR_FIELD } from "@/store/modules/carEditor/mutationTypes";

import {
  NButton,
  NForm,
  NFormItem,
  NSelect,
  NInput,
  NInputNumber,
  NImage,
  NSpin,
} from "naive-ui";
import { cdnLink } from "@/helpers/cdn";
import { statusOptions } from "@/helpers/postStatuses";
import { SAVE_CAR } from "@/store/modules/carEditor/actionTypes";

const store = useStore();
const car = computed(() => store.state.carEditor.car);
const isEdited = computed(() => store.state.carEditor.isEdited);
const isFetching = computed(() => store.state.carEditor.isFetching);

const renderBrandLabel = (option) => {
  try {
    return h("div", { className: "flex items-center" }, [
      h(NImage, {
        src: cdnLink(option.value.logo, 100),
        objectFit: "contain",
        height: 27,
        width: 27,
      }),
      h("p", { className: "pl-2" }, option.value.displayName),
    ]);
  } catch (error) {
    return "";
  }
};

const rules = {
  model: {
    required: true,
    message: "Поле Модель не может быть пустым",
  },
  year: {
    required: true,
    message: "Поле Год не может быть пустым",
    validator: yearValidator,
  },
};

const updateCarField = (field) => (val) =>
  store.commit(carEditorNamespace(UPDATE_CAR_FIELD), [field, val]);

const saveAction = () => {
  store.dispatch(carEditorNamespace(SAVE_CAR));
};
</script>
