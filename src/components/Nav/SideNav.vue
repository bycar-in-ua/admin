<script setup lang="ts">
import { h } from "vue";
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
import { NMenu, NIcon } from "naive-ui";
import type { MenuOption } from "naive-ui";
import {
  PodiumSharp,
  CaretDownOutline,
  CarSport,
  Car,
  Albums,
  Library,
  Images,
  Business,
} from "@vicons/ionicons5";

defineOptions({
  name: "SideNav",
});

defineProps({
  collapsed: Boolean,
});

function renderMenuIcon(icon) {
  if (icon) return () => h(NIcon, null, { default: () => h(icon) });

  return null;
}

const menuOptions: Omit<MenuOption, "icon">[] = [
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
    key: "Dealers",
    icon: Business,
  },
  {
    key: "AvailableVehicles",
    icon: Car,
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

const { t } = useI18n();

function createMenuOptions(menuOptions): MenuOption[] {
  return menuOptions.map((item) => ({
    ...item,
    label: t(`menuItems.${item.key}`, item.pluralism),
    icon: item.icon ? renderMenuIcon(item.icon) : null,
    children: item.children ? createMenuOptions(item.children) : undefined,
  }));
}

const renderMenuLabel = (option) => {
  return h(
    RouterLink,
    { to: { name: option.key }, exact: option.exact },
    { default: () => option.label }
  );
};

const expandIcon = () => h(NIcon, null, { default: () => h(CaretDownOutline) });
</script>

<template>
  <n-menu
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="createMenuOptions(menuOptions)"
    :render-label="renderMenuLabel"
    :expand-icon="expandIcon"
    :value="String($route.name)"
    :inverted="true"
  />
</template>
