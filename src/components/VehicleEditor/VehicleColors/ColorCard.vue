<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { cdnLink } from "@/helpers/cdn";
import { NIcon, NSpin, NP } from "naive-ui";
import { CloseCircleOutline, Pencil } from "@vicons/ionicons5";
import { ColorDto as Color } from "@bycar-in-ua/common";

interface IProps {
  color: Color;
  selectAction?: (...args) => void;
  closeAction?: (...args) => void | Promise<void>;
  editAction?: (...args) => void;
  selected?: boolean;
  editable?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  selectAction: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  closeAction: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  editAction: () => {},
  selected: false,
  editable: false,
});

const { t } = useI18n();

const isFetching = ref(false);

const closeHandler = async () => {
  try {
    isFetching.value = true;
    await props.closeAction(props.color);
  } finally {
    isFetching.value = false;
  }
};
</script>

<template>
  <div>
    <div class="relative image-wrapper">
      <img
        :src="cdnLink(color.reference, 300, 300)"
        :title="color?.name"
        class="rounded-full cursor-pointer"
        :class="selected ? 'border-solid border-2 border-primary' : ''"
        width="150"
        height="150"
        @click="selectAction(color, selected)"
      />
      <n-icon
        size="30"
        class="icon cursor-pointer left-0 top-0 hover:text-primary transition-all"
        :title="t('delete') + ': ' + color?.name"
        @click="closeHandler"
      >
        <CloseCircleOutline />
      </n-icon>
      <n-icon
        v-if="editable"
        size="30"
        class="icon cursor-pointer right-0 top-0 hover:text-primary transition-all"
        :title="t('edit') + ': ' + color?.name"
        @click="editAction(color)"
      >
        <Pencil />
      </n-icon>
      <div
        v-if="isFetching"
        class="absolute left-0 top-0 right-0 bottom-0 flex justify-center items-center bg-primary-light bg-opacity-30 rounded-full"
      >
        <n-spin size="medium" />
      </div>
    </div>
    <n-p class="text-center" v-text="color?.name" />
  </div>
</template>

<style>
.image-wrapper {
  &:hover {
    .icon {
      @apply opacity-100;
    }
  }
  .icon {
    @apply opacity-0 absolute;
  }
}
</style>
