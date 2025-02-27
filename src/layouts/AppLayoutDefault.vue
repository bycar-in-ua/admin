<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import useMemory from "@/hooks/useMemory";
import {
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutSider,
  NH2,
} from "naive-ui";
import TopNav from "../components/Nav/TopNav.vue";
import SideNav from "../components/Nav/SideNav.vue";

defineOptions({
  name: "DefaultLayout",
});

const collapsed = ref(false);

const memory = useMemory();

const { t } = useI18n();
const route = useRoute();

const pageTitle = computed(() => {
  if (!route.meta.title) {
    return "";
  }

  if (Array.isArray(route.meta.title)) {
    return t(route.meta.title[0] as string, route.meta.title[1]);
  }

  return t(route.meta.title as string);
});

const navBgImage = memory.get(
  "navBgImage",
  "https://images.unsplash.com/photo-1654447398834-4168622aab14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
);

const navStyle = {
  background: `linear-gradient(
      0deg,
      rgba(3, 1, 40, 0.5) 0%,
      rgba(28, 10, 134, 0.4),
      rgba(14, 15, 114, 0.5) 47%
    ),
    url("${navBgImage}")`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};
</script>

<template>
  <n-layout has-sider sider-position="left" class="h-screen relative">
    <n-layout-sider
      :native-scrollbar="false"
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger="bar"
      :style="navStyle"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <div class="h-12 flex justify-center items-center">
        <router-link :to="{ name: 'Dashboard' }">
          <a href="/" class="font-bold text-white text-2xl">
            <template v-if="collapsed"> b </template>
            <template v-else> bycar.in.ua </template>
          </a>
        </router-link>
      </div>
      <side-nav :collapsed="collapsed" />
    </n-layout-sider>
    <n-layout class="h-full main-content" :native-scrollbar="false">
      <n-layout-header class="z-10 h-12" position="absolute" bordered>
        <top-nav />
      </n-layout-header>
      <n-layout-content class="pt-16 p-8 container mx-auto">
        <n-h2 v-if="pageTitle" strong v-text="pageTitle" />
        <slot />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
