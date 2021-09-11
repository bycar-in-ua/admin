<template>
  <n-modal
    :show="showModal"
    :mask-closable="false"
    :title="
      isEdit
        ? `Редактирование: ${brand.displayName}`
        : 'Добавление нового бренда'
    "
    preset="card"
    class="max-w-xl"
    :onUpdate:show="onUpdate"
  >
    <n-form
      :rules="rules"
      ref="brandForm"
      :model="brandModel"
      :disablad="isFetching"
    >
      <n-upload
        action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
        list-type="image-card"
      >
        <n-upload-dragger>
          <img
            v-if="brand.logo"
            :src="brand.logo"
            :alt="brand.name"
            class="h-28 object-contain mx-auto"
          />
          <n-icon v-else size="48" :depth="3">
            <archive-icon />
          </n-icon>
        </n-upload-dragger>
      </n-upload>
      <n-form-item label="Название бренда" path="displayName">
        <n-input
          v-model:value="brandModel.displayName"
          placeholder="Введите название"
        />
      </n-form-item>
      <n-form-item label="Slug" path="name">
        <n-input v-model:value="brandModel.name" />
      </n-form-item>
    </n-form>
    <template #action>
      <div class="text-right">
        <n-button
          v-if="isEdit"
          type="primary"
          @click="saveAction"
          :disablad="isFetching"
        >
          Сохранить
        </n-button>
        <n-button
          v-else
          type="primary"
          @click="createAction"
          :disablad="isFetching"
        >
          Создать
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import {
  UPDATE_BRAND_MODAL_OPEN,
  UPDATE_BRAND_FIELD,
} from "@/store/modules/brands/modal/mutationTypes";
import {
  SAVE_BRAND_CHANGES,
  CREATE_NEW_BRAND,
} from "@/store/modules/brands/modal/actionTypes";
import {
  NModal,
  NUpload,
  NUploadDragger,
  NIcon,
  NForm,
  NFormItem,
  NInput,
  NButton,
} from "naive-ui";
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
import { brandNamespace } from "@/store/modules/brands";

export default {
  name: "BrandModal",
  setup() {
    const store = useStore();
    const brandForm = ref(null);

    const brand = computed(() => store.state.brands.modal.brand);
    const showModal = computed(() => store.state.brands.modal.isOpen);
    const isFetching = computed(() => store.state.brands.modal.isFetching);

    const onUpdate = (val) => {
      store.commit(brandNamespace(UPDATE_BRAND_MODAL_OPEN), val);
    };

    const updateFieldAction = (field, val) =>
      store.commit(brandNamespace(UPDATE_BRAND_FIELD), [field, val]);

    const brandModel = ref({
      displayName: computed({
        get: () => brand.value.displayName,
        set: (val) => updateFieldAction("displayName", val),
      }),
      name: computed({
        get: () => brand.value.name,
        set: (val) => updateFieldAction("name", val),
      }),
    });

    const isEdit = computed(() => !!brand.value.id);

    const saveAction = async () => {
      await brandForm.value.validate();
      store.dispatch(brandNamespace(SAVE_BRAND_CHANGES));
    };
    const createAction = async () => {
      await brandForm.value.validate();
      store.dispatch(brandNamespace(CREATE_NEW_BRAND));
    };

    const rules = {
      displayName: {
        required: true,
        message: "Название бренда - это обязательное поле",
      },
      name: {
        required: true,
        message: "Slug - не может быть пустым",
      },
    };

    return {
      brandForm,
      brandModel,
      showModal,
      isEdit,
      isFetching,
      onUpdate,
      brand,
      saveAction,
      createAction,
      rules,
    };
  },
  components: {
    NModal,
    NUpload,
    NUploadDragger,
    NIcon,
    ArchiveIcon,
    NForm,
    NFormItem,
    NInput,
    NButton,
  },
};
</script>