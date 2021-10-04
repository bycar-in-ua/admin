<template>
  <div class="mb-6">
    <n-button type="primary" @click="isModalOpen = true">Создать</n-button>
    <n-modal
      v-model:show="isModalOpen"
      preset="card"
      title="Добавление нового автомобиля"
      class="max-w-xl"
    >
      <n-form :model="formModel" ref="formRef" :rules="rules">
        <n-form-item label="Тип транспортного средства" path="type">
          <n-select
            v-model:value="formModel.type"
            :options="createOptions(types)"
            size="medium"
            disabled
          />
        </n-form-item>
        <n-form-item label="Бренд" path="brand">
          <n-select
            v-model:value="formModel.brand"
            :options="createOptions(brands)"
            size="medium"
            filterable
          />
        </n-form-item>
        <n-form-item label="Модель" path="model">
          <n-input
            v-model:value="formModel.model"
            type="text"
            placeholder="Введите название модели"
          />
        </n-form-item>
        <n-form-item label="Модельный год" path="year">
          <n-input
            v-model:value="formModel.year"
            type="text"
            placeholder="Введите модельный год"
          />
        </n-form-item>
      </n-form>
      <template #action>
        <div class="text-right">
          <n-button type="primary" @click="submitHandler">Создать</n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import apiClient from "@/helpers/apiClient";
import { yearValidator } from "@/helpers/validators";
import { brandNamespace } from "@/store/modules/brands";
import { FETCH_BRANDS } from "@/store/modules/brands/actionTypes";

import { NButton, NModal, NForm, NFormItem, NSelect, NInput } from "naive-ui";

const rules = {
  type: {
    required: true,
    message: "Поле Тип не может быть пустым",
  },
  brand: {
    required: true,
    message: "Поле Бренд не может быть пустым",
  },
  model: {
    required: true,
    message: "Поле Модель не может быть пустым",
  },
  year: {
    required: true,
    validator: yearValidator,
  },
};

export default {
  name: "CreateVehicleButton",
  setup() {
    const store = useStore();
    const router = useRouter();
    const types = computed(() => store.state.library.types);
    const brands = computed(() => store.state.brands.all);

    store.dispatch(brandNamespace(FETCH_BRANDS));

    const isModalOpen = ref(false);
    const formRef = ref(null);

    const typeCar = types.value.find((type) => type.name === "car");

    const formModel = ref({
      type: typeCar.id,
      brand: null,
      model: null,
      year: null,
    });

    const createOptions = (options) =>
      options.map((option) => ({
        label: option.displayName,
        value: option.id,
      }));

    const submitHandler = async () => {
      await formRef.value.validate();
      const newVehicle = await apiClient.post("/vehicles", formModel.value);
      router.push({ name: "EditVehicle", params: { id: newVehicle.id } });
    };

    return {
      brands,
      types,
      createOptions,
      isModalOpen,
      formRef,
      formModel,
      rules,
      submitHandler,
    };
  },
  components: { NButton, NModal, NForm, NFormItem, NSelect, NInput },
};
</script>
