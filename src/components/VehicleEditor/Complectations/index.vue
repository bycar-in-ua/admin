<template>
  <n-card title="Комплектации" size="small" class="my-4 shadow">
    <n-collapse>
      <n-collapse-item
        v-for="cmpl in complectations"
        :key="cmpl.id"
        :name="cmpl.id"
      >
        <template #header>
          <n-h4 v-text="cmpl.displayName" class="font-bold m-0" />
        </template>
        <div class="p-4 shadow-lg">
          <n-divider>Опции</n-divider>
          <options-editor />
          <n-divider>Цены</n-divider>
          <n-collapse>
            <n-collapse-item title="2.0 Skyactiv - 6 АКПП - $35000" name="1">
              <price-form />
            </n-collapse-item>

            <n-collapse-item title="2.5 Skyactiv - 6 АКПП - $38000" name="2">
              <price-form />
            </n-collapse-item>
          </n-collapse>
        </div>
      </n-collapse-item>
    </n-collapse>
    <n-divider>
      <n-popconfirm
        :show-icon="false"
        positive-text="Добавить комплектацию"
        @positive-click="createComplectation"
      >
        <template #trigger>
          <n-button circle title="Добавить комплектацию">
            <template #icon>
              <n-icon><Add /></n-icon>
            </template>
          </n-button>
        </template>

        <n-input
          v-model:value="newComplectationName"
          type="text"
          placeholder="Введите название комплектации"
        />
      </n-popconfirm>
    </n-divider>
  </n-card>
</template>

<script>
export default {
  name: "Complectations",
};
</script>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import {
  NCard,
  NH4,
  NCollapse,
  NCollapseItem,
  NDivider,
  NButton,
  NIcon,
  NPopconfirm,
  NInput,
} from "naive-ui";
import { Add } from "@vicons/ionicons5";
import PriceForm from "./PriceForm";
import OptionsEditor from "./OptionsEditor";
import { carEditorNamespace } from "@/store/modules/carEditor";
import { CREATE_NEW_COMPLECTATION } from "@/store/modules/carEditor/actionTypes";

const store = useStore();

const complectations = computed(() => store.state.carEditor.car.complectations);

const newComplectationName = ref("");

const createComplectation = async () => {
  await store.dispatch(
    carEditorNamespace(CREATE_NEW_COMPLECTATION),
    newComplectationName.value
  );
  newComplectationName.value = "";
};
</script>
