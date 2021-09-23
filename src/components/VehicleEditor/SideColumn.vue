<template>
  <n-form :model="car" :rules="rules">
    <div class="text-right mb-4">
      <n-button type="primary">Сохранить</n-button>
    </div>
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
        @input="updateModel"
        placeholder="Введите название модели"
      />
    </n-form-item>
    <n-form-item label="Модельный год" path="year">
      <n-input
        type="text"
        :value="car.year"
        @input="updateYear"
        placeholder="Введите модельный год"
      />
    </n-form-item>
  </n-form>
</template>

<script>
import { h, computed } from "vue";
import { useStore } from "vuex";

import { yearValidator } from "@/helpers/validators";
import { carEditorNamespace } from "@/store/modules/carEditor";
import { UPDATE_CAR_FIELD } from "@/store/modules/carEditor/mutationTypes";

import { NButton, NForm, NFormItem, NSelect, NInput, NImage } from "naive-ui";
import { cdnLink } from "@/helpers/cdn";

const renderBrandLabel = (option) => {
  try {
    return h("div", { className: "flex items-center" }, [
      h(NImage, {
        src: cdnLink(option.value.logo, 100),
        objectFit: "contain",
        height: 30,
        width: 30,
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

export default {
  name: "SideColumn",
  setup() {
    const store = useStore();
    const car = computed(() => store.state.carEditor.car);

    const updateCarField = (field, val) =>
      store.commit(carEditorNamespace(UPDATE_CAR_FIELD), [field, val]);

    const updateModel = (val) => {
      updateCarField("model", val);
    };

    const updateYear = (val) => {
      updateCarField("year", val);
    };

    return {
      car,
      rules,
      renderBrandLabel,
      updateModel,
      updateYear,
    };
  },
  components: { NButton, NForm, NFormItem, NSelect, NInput },
};
</script>
