<template>
  <n-menu
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
    :render-label="renderMenuLabel"
    :render-icon="renderMenuIcon"
    :expand-icon="expandIcon"
    :value="$route.name"
  />
</template>

<script>
import { h } from "vue";
import { RouterLink } from "vue-router";
import { NMenu, NIcon } from "naive-ui";
import { BookmarkOutline, CaretDownOutline } from "@vicons/ionicons5";

const menuOptions = [
  {
    label: "Дашборд",
    key: "Dashboard",
    exact: true,
  },
  {
    label: "Автомобили",
    key: "Vehicles",
  },
];

export default {
  name: "SideNav",
  setup() {
    const renderMenuLabel = (option) => {
      return h(
        RouterLink,
        { to: { name: option.key }, exact: option.exact },
        { default: () => option.label }
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
    NMenu,
  },
};
</script>
