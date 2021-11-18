<template>
  <n-modal
    :show="show"
    preset="card"
    :title="t('colors.add')"
    class="max-w-4xl"
    @update:show="toggleCallback"
  >
    <div class="flex justify-end mb-4">
      <n-button
        v-if="isAddingNew"
        type="primary"
        size="medium"
        @click="isAddingNew = false"
      >
        {{ t("discard") }}
      </n-button>
      <n-button v-else type="primary" size="medium" @click="isAddingNew = true">
        {{ t("colors.addNew") }}
      </n-button>
    </div>
    <AddNewColor v-if="isAddingNew" />
    <ColorsList v-else />
  </n-modal>
</template>

<script>
export default {
  name: "VehicleColorsModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    toggleCallback: {
      type: Function,
    },
  },
};
</script>

<script setup>
import { ref, provide } from "vue";
import { useI18n } from "vue-i18n";
import { NModal, NButton } from "naive-ui";
import ColorsList from "./ColorsList";
import AddNewColor from "./AddNewColor";

const { t } = useI18n();

const isAddingNew = ref(false);

const toggleAdding = (val) => (isAddingNew.value = val);

provide("toggleAddingNewColor", toggleAdding);
</script>
