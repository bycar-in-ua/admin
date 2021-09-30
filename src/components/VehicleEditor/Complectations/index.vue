<template>
  <n-card title="Комплектации" size="small" class="my-4 shadow">
    <n-collapse>
      <n-collapse-item
        v-for="(complectation, index) in complectations"
        :key="complectation.id"
        :name="complectation.id"
      >
        <template #header>
          <n-h4
            v-text="complectation.displayName"
            :complectationIndex="index"
            class="font-bold m-0"
          />
        </template>
        <div class="p-4 shadow-lg">
          <complectation-title-editor
            :complectation="complectation"
            :complectationIndex="index"
          />
          <n-divider>Опции</n-divider>
          <options-editor
            :complectation="complectation"
            :complectationIndex="index"
          />
          <div class="px-8 pt-6">
            <n-popconfirm
              :show-icon="false"
              positive-text="Добавить категорию опций"
              @positive-click="createOptionCategory"
            >
              <template #trigger>
                <n-icon
                  size="40"
                  :color="colors.primary.lighten1"
                  title="Добавить категорию опций"
                  class="cursor-pointer"
                >
                  <add-circle-outline />
                </n-icon>
              </template>
              <n-input
                v-model:value="newOptCatName"
                type="text"
                placeholder="Введите название категории опций"
              />
            </n-popconfirm>
          </div>
          <n-divider>Силовые агрегаты, ездовые характеристики, цены</n-divider>
          <n-collapse>
            <n-collapse-item title="2.0 Skyactiv - 6 АКПП - $35000" name="1">
              <price-form />
            </n-collapse-item>

            <n-collapse-item title="2.5 Skyactiv - 6 АКПП - $38000" name="2">
              <price-form />
            </n-collapse-item>
          </n-collapse>
          <div class="px-8 pt-6">
            <n-icon
              size="40"
              :color="colors.primary.lighten1"
              title="Добавить комбинацию Двигателя и Трансмиссии"
              class="cursor-pointer"
            >
              <add-circle-outline />
            </n-icon>
          </div>
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
          <n-icon
            size="40"
            :color="colors.primary.lighten1"
            title="Добавить комплектацию"
            class="cursor-pointer"
          >
            <add-circle-outline />
          </n-icon>
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
import colors from "@/colors";
import {
  NCard,
  NH4,
  NCollapse,
  NCollapseItem,
  NDivider,
  NIcon,
  NPopconfirm,
  NInput,
} from "naive-ui";
import { AddCircleOutline } from "@vicons/ionicons5";
import PriceForm from "./PriceForm";
import OptionsEditor from "./OptionsEditor";
import ComplectationTitleEditor from "./ComplectationTitleEditor";
import { carEditorNamespace } from "@/store/modules/carEditor";
import { CREATE_NEW_COMPLECTATION } from "@/store/modules/carEditor/actionTypes";
import { CREATE_OPTION_CATEGORY } from "@/store/modules/library/actionTypes";

const store = useStore();

const complectations = computed(() => store.state.carEditor.car.complectations);

const newComplectationName = ref("");
const newOptCatName = ref("");

const createComplectation = async () => {
  await store.dispatch(
    carEditorNamespace(CREATE_NEW_COMPLECTATION),
    newComplectationName.value
  );
  newComplectationName.value = "";
};

const createOptionCategory = async () => {
  await store.dispatch(CREATE_OPTION_CATEGORY, newOptCatName.value);
  newOptCatName.value = "";
};
</script>
