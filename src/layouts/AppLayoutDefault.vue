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
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :render-label="renderMenuLabel"
        :render-icon="renderMenuIcon"
        :expand-icon="expandIcon"
      />
    </n-layout-sider>
    <n-layout class="h-full main-content" :native-scrollbar="false">
      <n-layout-header class="z-10 h-12" position="absolute" bordered>
        test
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
import { h } from "vue";
import { RouterLink } from "vue-router";
import {
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutFooter,
  NLayoutSider,
  NMenu,
  NIcon,
} from "naive-ui";
import { BookmarkOutline, CaretDownOutline } from "@vicons/ionicons5";

const menuOptions = [
  {
    label: "Дашборд",
    route: {
      name: "Dashboard",
      exact: true,
    },
  },
  {
    label: "Автомобили",
    route: {
      name: "Vehicles",
    },
  },
];

export default {
  name: "DefaltLayout",
  setup() {
    const renderMenuLabel = (option) => {
      return h(
        RouterLink,
        { to: option.route, exacr: option.route?.exact },
        option.label
      );
    };
    const renderMenuIcon = (option) => {
      // return render placeholder for indent
      if (option.key === "sheep-man") return true;
      // return falsy, don't render icon placeholder
      if (option.key === "food") return null;
      return h(NIcon, null, { default: () => h(BookmarkOutline) });
    };
    const expandIcon = () => {
      return h(NIcon, null, { default: () => h(CaretDownOutline) });
    };
    return {
      menuOptions,
      renderMenuLabel,
      renderMenuIcon,
      expandIcon,
    };
  },
  data: () => ({
    collapsed: false,
  }),
  components: {
    NLayout,
    NLayoutContent,
    NLayoutHeader,
    NLayoutFooter,
    NLayoutSider,
    NMenu,
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
