<template>
  <n-dropdown trigger="hover" :options="options" @select="langSwitchHandler">
    <div class="mr-3 uppercase">{{ currentLocale }}</div>
  </n-dropdown>
</template>
<script>
export default {
  name: "LangSwitcher",
};
</script>

<script setup>
import { computed } from "vue";
import { NDropdown } from "naive-ui";
import { useI18n } from "vue-i18n";
import { setCookie } from "@/helpers/cookieHelpers";
import { COOKIE_DOMAIN } from "@/constants";

const i18n = useI18n();

const currentLocale = computed(() => i18n.locale.value);

const options = computed(() =>
  i18n.availableLocales.map((locale) => ({
    key: locale,
    label: locale.toUpperCase(),
    disabled: locale === currentLocale.value,
  }))
);

const langSwitchHandler = (lang) => {
  setCookie("lang", lang, { domain: COOKIE_DOMAIN });
  i18n.locale.value = lang;
};
</script>
