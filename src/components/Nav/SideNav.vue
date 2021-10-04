<template>
  <n-menu
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="createMenuOptions()"
    :render-label="renderMenuLabel"
    :expand-icon="expandIcon"
    :value="$route.name"
    inverted
  />
</template>

<script>
import { h } from "vue";
import { RouterLink } from "vue-router";
import { NMenu, NIcon } from "naive-ui";
import {
  PodiumSharp,
  CaretDownOutline,
  CarSport,
  Albums,
} from "@vicons/ionicons5";

function renderMenuIcon(icon) {
  if (icon) return () => h(NIcon, null, { default: () => h(icon) });

  return null;
}

const menuOptions = [
  {
    label: "Дашборд",
    key: "Dashboard",
    exact: true,
    icon: PodiumSharp,
  },
  {
    label: "Автомобили",
    key: "Vehicles",
    icon: CarSport,
  },
  {
    label: "Бренды",
    key: "Brands",
    icon: Albums,
  },
];

const createMenuOptions = () =>
  menuOptions.map((item) => ({
    ...item,
    icon: renderMenuIcon(item.icon),
  }));

export default {
  name: "SideNav",
  props: {
    collapsed: Boolean,
  },
  setup() {
    const renderMenuLabel = (option) => {
      return h(
        RouterLink,
        { to: { name: option.key }, exact: option.exact },
        { default: () => option.label }
      );
    };

    const expandIcon = () => {
      return h(NIcon, null, { default: () => h(CaretDownOutline) });
    };
    return {
      renderMenuLabel,
      expandIcon,
      createMenuOptions,
    };
  },
  components: {
    NMenu,
  },
};
</script>
