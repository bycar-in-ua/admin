<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { yearValidator, slugValidator } from "@/helpers/validators";
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
import { useBrandsStore } from "@/stores/brands.store";
import { useVehiclesService } from "@/composables/useVehiclesService";
import { PostStatus } from "@bycar-in-ua/sdk";

defineOptions({
  name: "CreateVehicleModal",
});

const rules = {
  brandId: {
    required: true,
    message: 'Поле "Бренд" не може бути пустим',
  },
  model: {
    required: true,
    message: 'Поле "Модель" не може бути пустим',
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

const brandsStore = useBrandsStore();
const router = useRouter();
const { t } = useI18n();
const notification = useNotification();

const formRef = ref(null);
const isModalOpen = ref(false);

const formModel = ref({
  brandId: null,
  model: null,
  yearFrom: null,
  yearTo: null,
  bodyName: null,
  slug: null,
  status: PostStatus.DRAFT,
});

const createOptions = (options) =>
  options.map((option) => ({
    label: option.displayName,
    value: option.id,
  }));

const vehiclesService = useVehiclesService();

const submitHandler = async () => {
  try {
    await formRef.value.validate();
    const newVehicle = await vehiclesService.createVehicle(formModel.value);
    router.push({ name: "EditVehicle", params: { slug: newVehicle.slug } });
  } catch (e) {
    const error = e as Error;

    notification.error({
      title: t("notifications.error.title.default"),
      description: error.message,
      content: t("notifications.vehicle.creating.error"),
      duration: 5000,
    });
  }
};
</script>

<template>
  <n-button type="primary" class="mr-auto" @click="isModalOpen = true">
    {{ t("create") }}
  </n-button>

  <n-modal
    v-model:show="isModalOpen"
    preset="card"
    :title="t('vehicle.addNew')"
    class="max-w-xl"
  >
    <n-form ref="formRef" :model="formModel" :rules="rules">
      <n-form-item :label="t('brand', 1)" path="brandId">
        <n-select
          v-model:value="formModel.brandId"
          :options="createOptions(brandsStore.brands)"
          :placeholder="t('choose')"
          size="medium"
          filterable
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.model')" path="model">
        <n-input
          v-model:value="formModel.model"
          type="text"
          :placeholder="t('vehicle.enterModel')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.modelYear')" path="yearFrom">
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
        <n-input v-model:value="formModel.bodyName" type="text" />
      </n-form-item>
      <n-form-item :label="t('vehicle.slug')" path="slug">
        <n-input v-model:value="formModel.slug" type="text">
          <template #suffix>
            <n-popover trigger="hover">
              <template #trigger>
                <n-icon size="20" class="cursor-help">
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
        <n-button type="primary" @click="submitHandler">
          {{ t("create") }}
        </n-button>
      </div>
    </template>
  </n-modal>
</template>
