<template>
  <n-form :model="car" :rules="rules">
    <div class="text-right mb-4">
      <n-button type="primary" @click="saveAction" :disabled="!isEdited">
        <template v-if="isFetching">
          <n-spin size="small" stroke="white" />
        </template>
        <template v-else> {{ t("save") }} </template>
      </n-button>
    </div>
    <n-form-item :label="t('status')">
      <n-select
        size="medium"
        :value="car.status"
        :options="statusOptions"
        :on-update:value="updateCarField('status')"
      />
    </n-form-item>
    <n-form-item :label="t('brand')" required>
      <n-select
        size="medium"
        disabled
        :value="car.brand"
        :renderLabel="renderBrandLabel"
      />
    </n-form-item>
    <n-form-item :label="t('vehicle.model')" path="model">
      <n-input
        type="text"
        :value="car.model"
        :on-update:value="updateCarField('model')"
        :placeholder="t('vehicle.enterModel')"
      />
    </n-form-item>
    <n-form-item :label="t('vehicle.modelYear')" path="year">
      <n-input-group>
        <n-input-number
          class="w-full"
          :value="car.yearFrom"
          :min="2010"
          :placeholder="t('vehicle.enterModelYear')"
          :on-update:value="updateCarField('yearFrom')"
        />
        <n-input-number
          class="w-full"
          :min="car.yearFrom"
          :value="car.yearTo"
          :placeholder="t('vehicle.enterModelYear')"
          :on-update:value="updateCarField('yearTo')"
        />
      </n-input-group>
    </n-form-item>
    <n-form-item :label="t('vehicle.bodyName')">
      <n-input
        type="text"
        :value="car.bodyName"
        :on-update:value="updateCarField('bodyName')"
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
import { h, computed, inject } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

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
  NInputGroup,
  NImage,
  NSpin,
} from "naive-ui";
import { cdnLink } from "@/helpers/cdn";
import { statuses } from "@/helpers/postStatuses";
import { SAVE_CAR } from "@/store/modules/carEditor/actionTypes";

const store = useStore();
const { t } = useI18n();
const showNotification = inject("showNotification");

const car = computed(() => store.state.carEditor.car);
const isEdited = computed(() => store.state.carEditor.isEdited);
const isFetching = computed(() => store.state.carEditor.isFetching);

const statusOptions = statuses.map((status) => ({
  value: status,
  label: t("vehicle.status." + status),
}));

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

const saveAction = async () => {
  try {
    await store.dispatch(carEditorNamespace(SAVE_CAR));
    showNotification("success", {
      title: t("notifications.vehicle.saving.success"),
      duration: 3000,
    });
  } catch (error) {
    showNotification("error", {
      title: t("notifications.error.title.default"),
      content: t("notifications.vehicle.saving.error"),
      description: error.message,
      duration: undefined,
    });
  }
};
</script>
