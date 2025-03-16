<script setup lang="ts">
import { h, ref } from "vue";
import { useI18n } from "vue-i18n";
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
import { InformationCircleOutline } from "@vicons/ionicons5";
import { Images, type ToolbarAction } from "@/components/Images";
import {
  H1Input,
  MetaTitleInput,
  MetaDescriptionInput,
} from "@/components/SeoInputs";
import { yearValidator, slugValidator } from "@/helpers/validators";
import { cdnLink } from "@/helpers/cdn";
import { statuses } from "@/helpers/postStatuses";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";
import { useEditorStore } from "@/stores/vehicleEditor/editor.store";
import { useImagesStore } from "@/stores/images.store";

const editorStore = useEditorStore();
const vehicleStore = useVehicleStore();
const imagesStore = useImagesStore();

vehicleStore.$subscribe(() => {
  editorStore.isModified = true;
});

const { t } = useI18n();
const notification = useNotification();
const loading = useLoadingBar();

const showImageModal = ref(false);
const formRef = ref<FormInst>();

const statusOptions = statuses.map((status) => ({
  value: status,
  label: t("vehicle.status." + status),
}));

const renderBrandLabel = () => {
  try {
    const brand = vehicleStore.car.brand;

    return h("div", { className: "flex items-center" }, [
      h(NImage, {
        src: cdnLink(brand.logo, "thumbnail"),
        previewDisabled: true,
        objectFit: "contain",
        height: 27,
        width: 27,
        lazy: true,
      }),
      h("p", { className: "pl-2" }, brand.displayName),
    ]);
  } catch {
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

const afterModalEnter = () => {
  imagesStore.images = vehicleStore.car.images.map(({ image }) => image);
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
  } catch (e) {
    const error = e as Error;
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

const toolbarActions: ToolbarAction[] = [
  {
    component: h(
      NButton,
      {
        type: "primary",
        class: "mr-4",
      },
      t("save")
    ),
    clickCallback: (selectedImages) => {
      vehicleStore.car.featureImage = selectedImages[0];
      showImageModal.value = false;
    },
  },
];
</script>

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
        :value="vehicleStore.car.brand.id"
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

    <H1Input v-model="vehicleStore.car.h1" />

    <MetaTitleInput v-model="vehicleStore.car.metaTitle" />

    <MetaDescriptionInput v-model="vehicleStore.car.metaDescription" />

    <p>
      {{ t("vehicle.featureImage") }}
    </p>
    <div
      class="w-full bg-primary-light rounded-lg border-dashed border-4 border-primary bg-opacity-30 hover:bg-opacity-70 transition-all cursor-pointer flex justify-center"
      style="min-height: 60px"
      @click="showImageModal = true"
    >
      <n-image
        v-if="vehicleStore.car.featureImage"
        :src="cdnLink(vehicleStore.car.featureImage.path, 'thumbnail')"
        class="w-full"
        object-fit="cover"
        width="100%"
        review-disabled
        lazy
      />
    </div>
  </n-form>
  <n-modal
    v-model:show="showImageModal"
    preset="card"
    class="max-w-6xl"
    :on-after-enter="afterModalEnter"
  >
    <Images
      :is-uploadble="false"
      :is-selectable="true"
      :single-selection="true"
      :discardable="false"
      :toolbar-actions="toolbarActions"
      :preselected-images="[vehicleStore.car.featureImage].filter(Boolean)"
    />
  </n-modal>
</template>
