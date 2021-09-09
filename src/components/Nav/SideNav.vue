<template>
  <n-menu
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
    :render-label="renderMenuLabel"
    :expand-icon="expandIcon"
    :value="$route.name"
  />
</template>

<script>
import { h } from "vue";
import { RouterLink } from "vue-router";
import { NMenu, NIcon } from "naive-ui";
import { PodiumSharp, CaretDownOutline, CarSport } from "@vicons/ionicons5";

function renderMenuIcon(icon) {
  if (icon)
    return () => h(NIcon, null, { default: () => h(icon) });

  return null;
}

const menuOptions = [
  {
    label: "Дашборд",
    key: "Dashboard",
    exact: true,
    icon: renderMenuIcon(PodiumSharp),
  },
  {
    label: "Автомобили",
    key: "Vehicles",
    icon: renderMenuIcon(CarSport),
    children: [
      {
        label: "Все автомобили",
        key: "Vehicles",
      },
      {
        label: "Бренды",
        key: "Brands",
      },
    ],
  },
];

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
      menuOptions,
      renderMenuLabel,
      expandIcon,
    };
  },
  components: {
    NMenu,
  },
};
</script>
