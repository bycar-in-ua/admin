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
        <n-h2
          v-if="$route.meta.title"
          strong
          v-text="t(...$route.meta.title)"
        />
        <slot />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script>
export default {
  name: "DefaltLayout",
};
</script>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
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

const collapsed = ref(false);

const memory = useMemory();

const { t } = useI18n();

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

<style lang="postcss">
.main-content {
  .n-scrollbar-content {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    .n-layout-scroll-container {
      flex: 1 1 auto;
    }
  }
}
</style>
