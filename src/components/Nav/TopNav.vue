<script setup lang="ts">
import { inject } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { NAvatar, NDropdown, NIcon, DropdownOption, NSelect } from "naive-ui";
import { StarHalf } from "@vicons/ionicons5";
import LangSwitcher from "./LangSwitcher.vue";
import { useAuthStore } from "@/stores/auth.store";
import { useLlm } from "@/composables/useLlm";

defineOptions({
  name: "TopNav",
});

const themeSwitcher = inject<() => void>("themeSwitcher");
const router = useRouter();
const authStore = useAuthStore();
const { t } = useI18n();

const handlepsMap = {
  profile: () => {
    router.push({ name: "Profile" });
  },
  logout: async () => {
    await authStore.logoutUser();
    router.push({ name: "Login" });
  },
};

function selectHandler(key) {
  handlepsMap[key]();
}

const profileMenuItems: DropdownOption[] = [
  {
    key: "profile",
    label: t("profile"),
  },
  {
    key: "logout",
    label: t("logout"),
  },
];

const { llmName, availableModels, setLlmName } = useLlm();

const llmOptions = availableModels.map((model) => ({
  label: model,
  value: model,
}));
</script>

<template>
  <div class="flex items-center h-full p-2">
    <div class="flex-grow" />

    <NSelect
      :value="llmName"
      :options="llmOptions"
      @update:value="setLlmName"
      class="mr-2 max-w-60"
      size="small"
    />

    <n-icon size="25" class="mr-2 cursor-pointer" title="Сменить тему">
      <star-half @click="themeSwitcher" />
    </n-icon>

    <lang-switcher />

    <n-dropdown
      trigger="hover"
      :options="profileMenuItems"
      placement="bottom-end"
      @select="selectHandler"
    >
      <n-avatar
        round
        src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
      />
    </n-dropdown>
  </div>
</template>
