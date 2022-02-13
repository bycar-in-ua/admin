<template>
  <n-form :model="car" :rules="rules" ref="formRef">
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
    <n-form-item :label="t('vehicle.modelYear')">
      <n-input-group>
        <n-input-number
          class="w-full"
          :value="car.yearFrom"
          :placeholder="t('vehicle.enterModelYear')"
          :on-update:value="updateCarField('yearFrom')"
        />
        <n-input-number
          class="w-full"
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
    <n-form-item :label="t('vehicle.slug')" path="slug">
      <n-input
        type="text"
        :value="car.slug"
        :on-update:value="updateCarField('slug')"
      >
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
    <p>
      {{ t("vehicle.featureImage") }}
    </p>
    <div
      class="w-full bg-primary-light rounded-lg border-dashed border-4 border-primary bg-opacity-30 hover:bg-opacity-70 transition-all cursor-pointer"
      @click="setModalOpen(true)"
      style="min-height: 100px"
    >
      <img
        v-if="car.featureImage"
        :src="cdnLink(car.featureImage.path, 300)"
        preview-disabled
        height="180"
      />
    </div>
  </n-form>
  <n-modal
    :show="showImageModal"
    @update:show="setModalOpen"
    preset="card"
    class="max-w-6xl"
  >
    <Images
      :is-selectable="true"
      :single-selection="true"
      :discardable="false"
      :toolbar-actions="toolbarActions"
      :preselected-images="[car.featureImage ? car.featureImage : false]"
    />
  </n-modal>
</template>

<script>
export default {
  name: "SideColumn",
};
</script>

<script setup>
import { h, computed, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import Images from "@/components/Images";
import { yearValidator, slugValidator } from "@/helpers/validators";
import { carEditorNamespace } from "@/store/modules/carEditor";
import { UPDATE_CAR_FIELD } from "@/store/modules/carEditor/mutationTypes";
import { InformationCircleOutline } from "@vicons/ionicons5";
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
  NPopover,
  NIcon,
  NModal,
  useNotification,
  useLoadingBar,
} from "naive-ui";
import { cdnLink } from "@/helpers/cdn";
import { statuses } from "@/helpers/postStatuses";
import { SAVE_CAR } from "@/store/modules/carEditor/actionTypes";

const store = useStore();
const { t } = useI18n();
const notification = useNotification();
const loading = useLoadingBar();

const showImageModal = ref(false);
const formRef = ref(null);

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
        previewDisabled: true,
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
    validator: yearValidator,
  },
  slug: {
    required: true,
    validator: slugValidator,
  },
};

const updateCarField = (field) => (val) =>
  store.commit(carEditorNamespace(UPDATE_CAR_FIELD), [field, val]);

const saveAction = async () => {
  try {
    await formRef.value.validate();
    loading.start();
    await store.dispatch(carEditorNamespace(SAVE_CAR));
    notification.success({
      title: t("notifications.vehicle.saving.success"),
      duration: 3000,
    });
  } catch (error) {
    notification.error({
      title: t("notifications.error.title.default"),
      content: t("notifications.vehicle.saving.error"),
      description: error.message,
      duration: undefined,
    });
  } finally {
    loading.finish();
  }
};

const setModalOpen = (val) => {
  showImageModal.value = val;
};

const toolbarActions = [
  {
    component: h(
      NButton,
      {
        type: "primary",
        class: "mr-4",
      },
      t("save")
    ),
    clickCallback: async (selectedImages) => {
      updateCarField("featureImage")(selectedImages[0]);
      setModalOpen(false);
      await saveAction();
    },
  },
];
</script>
