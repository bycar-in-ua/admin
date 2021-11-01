<template>
  <div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-4"
  >
    <n-skeleton
      v-if="images.isFetching"
      :repeat="10"
      width="100%"
      height="15vh"
    />
    <template v-else>
      <n-image
        v-for="image in images.items"
        :key="image.id"
        :src="cdnLink(image.path, 300, 300)"
      />
    </template>
  </div>
  <n-empty
    v-if="!images.items?.length"
    :description="t('images.empty')"
    class="p-4"
  />
  <n-pagination
    v-if="images.pages > 1"
    class="mt-4 justify-end"
    :page="images.curentPage"
    :page-count="images.totalPages"
    :disabled="images.isFetching"
  />
</template>

<script>
export default {
  name: "Images",
};
</script>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { cdnLink } from "@/helpers/cdn";
import { NImage, NPagination, NSkeleton, NEmpty } from "naive-ui";
import { FETCH_IMAGES } from "@/store/modules/library/images/actionTypes";

const store = useStore();
const { t } = useI18n();

store.dispatch(FETCH_IMAGES);

const images = computed(() => store.state.library.images);
</script>
