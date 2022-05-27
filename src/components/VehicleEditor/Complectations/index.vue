<template>
  <n-card :title="t('complectations.title')" size="small" class="my-4 shadow">
    <div class="editors-cards-grid">
      <n-card
        v-for="complectation in complectations"
        :key="complectation.id"
        :title="complectation.displayName"
      >
        <template #action>
          <div class="flex flex-wrap justify-between">
            <a href="#delete-complectation" class="text-red-500">
              {{ t("delete") }}
            </a>
            <a
              href="#edit-complectation"
              class="text-primary"
              @click.prevent="openEditModal(complectation)"
            >
              {{ t("edit") }}
            </a>
          </div>
        </template>
      </n-card>

      <n-popconfirm
        :show-icon="false"
        :positive-text="t('complectations.addNew')"
        :negative-text="t('discard')"
        @positive-click="createComplectation"
      >
        <template #trigger>
          <plus-button
            :callback="() => ({})"
            :title="t('complectations.addNew')"
          />
        </template>

        <n-input
          v-model:value="newComplectationName"
          type="text"
          :placeholder="t('complectations.enterName')"
        />
      </n-popconfirm>
    </div>
  </n-card>
  <complectation-modal
    v-model:show="showModal"
    @close-modal="showModal = false"
  />
</template>

<script>
export default {
  name: "Complectations",
};
</script>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { NCard, NPopconfirm, NInput } from "naive-ui";
import ComplectationModal from "./ComplectationModal";
import PlusButton from "@/components/common/PlusButton";
import { carEditorNamespace } from "@/store/modules/carEditor";
import { CREATE_NEW_COMPLECTATION } from "@/store/modules/carEditor/actionTypes";
import { OPEN_COMPLECTATION_EDIT_MODAL } from "@/store/modules/carEditor/complectation/actionTypes";

const store = useStore();
const { t } = useI18n();

const complectations = computed(() => store.state.carEditor.car.complectations);

const newComplectationName = ref("");
const showModal = ref(false);

const openEditModal = (complectation) => {
  store.dispatch(
    carEditorNamespace(OPEN_COMPLECTATION_EDIT_MODAL),
    complectation
  );
  showModal.value = true;
};

const createComplectation = async () => {
  await store.dispatch(
    carEditorNamespace(CREATE_NEW_COMPLECTATION),
    newComplectationName.value
  );
  newComplectationName.value = "";
};
</script>
