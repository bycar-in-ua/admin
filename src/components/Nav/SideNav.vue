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
import { useI18n } from "vue-i18n";
import { NMenu, NIcon } from "naive-ui";
import {
  PodiumSharp,
  CaretDownOutline,
  CarSport,
  Albums,
  Library,
  Images,
} from "@vicons/ionicons5";

function renderMenuIcon(icon) {
  if (icon) return () => h(NIcon, null, { default: () => h(icon) });

  return null;
}

const menuOptions = [
  {
    key: "Dashboard",
    exact: true,
    icon: PodiumSharp,
  },
  {
    key: "Vehicles",
    icon: CarSport,
  },
  {
    key: "Brands",
    icon: Albums,
  },
  {
    key: "Library",
    icon: Library,
  },
  {
    key: "Images",
    icon: Images,
  },
];

export default {
  name: "SideNav",
  props: {
    collapsed: Boolean,
  },
  setup() {
    const { t } = useI18n();

    const createMenuOptions = () =>
      menuOptions.map((item) => ({
        ...item,
        label: t(`menuItems.${item.key}`),
        icon: renderMenuIcon(item.icon),
      }));

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
