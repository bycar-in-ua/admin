<template>
  <n-modal
    v-model:show="show"
    preset="card"
    :title="t('vehicle.addNew')"
    class="max-w-xl"
  >
    <n-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
    >
      <n-form-item
        :label="t('vehicle.type')"
        path="typeId"
      >
        <n-select
          v-model:value="formModel.typeId"
          :options="createOptions(types)"
          size="medium"
          disabled
        />
      </n-form-item>
      <n-form-item
        :label="t('brand', 1)"
        path="brandId"
      >
        <n-select
          v-model:value="formModel.brandId"
          :options="createOptions(brands)"
          :placeholder="t('choose')"
          size="medium"
          filterable
        />
      </n-form-item>
      <n-form-item
        :label="t('vehicle.model')"
        path="model"
      >
        <n-input
          v-model:value="formModel.model"
          type="text"
          :placeholder="t('vehicle.enterModel')"
        />
      </n-form-item>
      <n-form-item
        :label="t('vehicle.modelYear')"
        path="yearFrom"
      >
        <n-input-group>
          <n-input-number
            v-model:value="formModel.yearFrom"
            type="text"
            :placeholder="t('vehicle.enterModelYear')"
            class="w-full"
          />
          <n-input-number
            v-model:value="formModel.yearTo"
            type="text"
            :placeholder="t('vehicle.enterModelYear')"
            class="w-full"
          />
        </n-input-group>
      </n-form-item>
      <n-form-item :label="t('vehicle.bodyName')">
        <n-input
          v-model:value="formModel.bodyName"
          type="text"
        />
      </n-form-item>
      <n-form-item
        :label="t('vehicle.slug')"
        path="slug"
      >
        <n-input
          v-model:value="formModel.slug"
          type="text"
        >
          <template #suffix>
            <n-popover trigger="hover">
              <template #trigger>
                <n-icon
                  size="20"
                  class="cursor-help"
                >
                  <InformationCircleOutline />
                </n-icon>
              </template>
              {{ t("vehicle.slugDescription") }}
            </n-popover>
          </template>
        </n-input>
      </n-form-item>
    </n-form>
    <template #action>
      <div class="text-right">
        <n-button
          type="primary"
          @click="submitHandler"
        >
          {{
            t("create")
          }}
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script>
export default {
  name: "CreateVehicleModal",
};
</script>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import apiClient from "@/helpers/apiClient";
import { yearValidator, slugValidator } from "@/helpers/validators";
import { brandNamespace } from "@/store/modules/brands";
import { FETCH_BRANDS } from "@/store/modules/brands/actionTypes";
import { InformationCircleOutline } from "@vicons/ionicons5";
import {
  NButton,
  NModal,
  NForm,
  NFormItem,
  NSelect,
  NInput,
  NInputNumber,
  NInputGroup,
  NIcon,
  NPopover,
  useNotification,
} from "naive-ui";

const rules = {
  typeId: {
    required: true,
    message: "Поле Тип не может быть пустым",
  },
  brandId: {
    required: true,
    message: "Поле Бренд не может быть пустым",
  },
  model: {
    required: true,
    message: "Поле Модель не может быть пустым",
  },
  yearFrom: {
    required: true,
    validator: yearValidator,
  },
  slug: {
    required: true,
    validator: slugValidator,
  },
};

const store = useStore();
const router = useRouter();
const { t } = useI18n();
const notification = useNotification();

const types = computed(() => store.state.library.types);
const brands = computed(() => store.state.brands.all);

store.dispatch(brandNamespace(FETCH_BRANDS));

const formRef = ref(null);

const typeCar = types.value.find((type) => type.name === "car");

const formModel = ref({
  typeId: typeCar.id,
  brandId: null,
  model: null,
  yearFrom: null,
  yearTo: null,
  bodyName: null,
  slug: null,
});

const createOptions = (options) =>
  options.map((option) => ({
    label: option.displayName,
    value: option.id,
  }));

const submitHandler = async () => {
  try {
    await formRef.value.validate();
    const newVehicle = await apiClient.post("/vehicles", formModel.value);
    router.push({ name: "EditVehicle", params: { slug: newVehicle.slug } });
  } catch (error) {
    notification.error({
      title: t("notifications.error.title.default"),
      description: error.message,
      content: t("notifications.vehicle.creating.error"),
      duration: 5000,
    });
  }
};
</script>
