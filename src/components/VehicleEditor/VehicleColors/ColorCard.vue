<template>
  <div class="relative image-wrapper">
    <img
      :src="cdnLink(color.reference, 300, 300)"
      class="rounded-full cursor-pointer"
      :class="selected ? 'border-2 border-primary' : ''"
      width="150"
      height="150"
      @click="selectAction(color, selected)"
    />
    <n-icon
      size="30"
      class="
        icon
        cursor-pointer
        absolute
        left-0
        top-0
        hover:text-primary
        transition-all
      "
      @click="closeHandler"
    >
      <close-circle-outline />
    </n-icon>
    <div
      v-if="isFetching"
      class="
        absolute
        left-0
        top-0
        right-0
        bottom-0
        flex
        justify-center
        items-center
        bg-primary-light bg-opacity-30
        rounded-full
      "
    >
      <n-spin size="medium" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ColorCard",
};
</script>

<script setup>
import { ref, defineProps } from "vue";
import { cdnLink } from "@/helpers/cdn";
import { NIcon, NSpin } from "naive-ui";
import { CloseCircleOutline } from "@vicons/ionicons5";

const props = defineProps({
  color: {
    type: Object,
    requierd: true,
  },
  selectAction: {
    type: Function,
    default: () => {},
  },
  closeAction: {
    type: Function || Promise,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

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

<style lang="scss">
.image-wrapper {
  &:hover {
    .icon {
      @apply opacity-100;
    }
  }
  .icon {
    @apply opacity-0;
  }
}
</style>
