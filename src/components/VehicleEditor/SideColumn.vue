<template>
  <n-form ref="formRef" :model="vehicleStore.car" :rules="rules">
    <div class="text-right mb-4">
      <n-button
        type="primary"
        :loading="editorStore.isFetching"
        :disabled="!editorStore.isModified"
        @click="saveAction"
      >
        {{ t("save") }}
      </n-button>
    </div>
    <n-form-item :label="t('status')">
      <n-select
        v-model:value="vehicleStore.car.status"
        size="medium"
        :options="statusOptions"
      />
    </n-form-item>
    <n-form-item :label="t('brand')" required>
      <n-select
        :value="asAny(vehicleStore.car.brand)"
        size="medium"
        disabled
        :render-label="renderBrandLabel"
      />
    </n-form-item>
    <n-form-item :label="t('vehicle.model')" path="model">
      <n-input
        v-model:value="vehicleStore.car.model"
        :placeholder="t('vehicle.enterModel')"
      />
    </n-form-item>
    <n-form-item :label="t('vehicle.modelYear')">
      <n-input-group>
        <n-input-number
          v-model:value="vehicleStore.car.yearFrom"
          class="w-full"
          :placeholder="t('vehicle.enterModelYear')"
        />
        <n-input-number
          v-model:value="vehicleStore.car.yearTo"
          class="w-full"
          :placeholder="t('vehicle.enterModelYear')"
        />
      </n-input-group>
    </n-form-item>
    <n-form-item :label="t('vehicle.bodyName')">
      <n-input v-model:value="vehicleStore.car.bodyName" />
    </n-form-item>
    <n-form-item :label="t('vehicle.slug')" path="slug">
      <n-input v-model:value="vehicleStore.car.slug">
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
      class="w-full bg-primary-light rounded-lg border-dashed border-4 border-primary bg-opacity-30 hover:bg-opacity-70 transition-all cursor-pointer flex justify-center"
      style="min-height: 60px"
      @click="setModalOpen(true)"
    >
      <img
        v-if="vehicleStore.car.featureImage"
        :src="cdnLink(vehicleStore.car.featureImage.path, 300)"
        class="w-full object-cover"
      />
    </div>
  </n-form>
  <n-modal
    :show="showImageModal"
    preset="card"
    class="max-w-6xl"
    @update:show="setModalOpen"
  >
    <Images
      :is-selectable="true"
      :single-selection="true"
      :discardable="false"
      :toolbar-actions="toolbarActions"
      :preselected-images="[
        vehicleStore.car.featureImage
          ? vehicleStore.car.featureImage.id
          : false,
      ]"
      :vuex-action="SET_IMAGES"
      :action-payload="vehicleStore.car.images"
    />
  </n-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideColumn",
});
</script>

<script setup lang="ts">
import { h, ref, Ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import Images from "@/components/Images/index.vue";
import { yearValidator, slugValidator } from "@/helpers/validators";
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
  NPopover,
  NIcon,
  NModal,
  useNotification,
  useLoadingBar,
  FormInst,
} from "naive-ui";
import { cdnLink } from "@/helpers/cdn";
import { statuses } from "@/helpers/postStatuses";
import { SET_IMAGES } from "@/store/modules/library/images/actionTypes";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";
import { useEditorStore } from "@/stores/vehicleEditor/editor.store";
import { BrandDto as Brand } from "@common/dto";

const editorStore = useEditorStore();
const vehicleStore = useVehicleStore();

vehicleStore.$subscribe(() => {
  editorStore.isModified = true;
});

const store = useStore();
const { t } = useI18n();
const notification = useNotification();
const loading = useLoadingBar();

const showImageModal = ref(false);
const formRef = ref<FormInst>();

const statusOptions = statuses.map((status) => ({
  value: status,
  label: t("vehicle.status." + status),
}));

const renderBrandLabel = (option: Ref<Brand>) => {
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

const saveAction = async () => {
  try {
    await formRef.value?.validate();
    loading.start();
    await vehicleStore.saveCar();
    notification.success({
      title: t("notifications.vehicle.saving.success"),
      duration: 3000,
    });
  } catch (error: Error) {
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
    clickCallback: async (selectedImagesIds) => {
      try {
        const selectedImage = store.state.library.images.items.find(
          (image) => image.id == selectedImagesIds[0]
        );
        vehicleStore.car.featureImage = selectedImage;
        await saveAction();
      } finally {
        setModalOpen(false);
      }
    },
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const asAny = (foo: any) => foo as any;
</script>
