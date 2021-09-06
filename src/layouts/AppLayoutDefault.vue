<template>
  <n-layout has-sider sider-position="left" class="h-screen relative">
    <n-layout-sider
      :native-scrollbar="false"
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <div class="h-12 flex justify-center items-center">
        <router-link :to="{ name: 'Dashboard' }">
          <a href="/" class="font-bold text-primary text-2xl">bycar.in.ua</a>
        </router-link>
      </div>
      <side-nav />
    </n-layout-sider>
    <n-layout class="h-full main-content" :native-scrollbar="false">
      <n-layout-header class="z-10 h-12" position="absolute" bordered>
        <top-nav />
      </n-layout-header>
      <n-layout-content class="pt-12">
        <slot />
      </n-layout-content>
      <n-layout-footer class="text-center p-2">
        <a href="https://bycar.in.ua/">bycar.in.ua</a> Все права защищены.
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script>
import {
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutFooter,
  NLayoutSider,
} from "naive-ui";
import TopNav from "../components/Nav/TopNav.vue";
import SideNav from "../components/Nav/SideNav.vue";

export default {
  name: "DefaltLayout",
  data: () => ({
    collapsed: false,
  }),
  components: {
    NLayout,
    NLayoutContent,
    NLayoutHeader,
    NLayoutFooter,
    NLayoutSider,
    TopNav,
    SideNav,
  },
};
</script>

<style lang="scss">
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
