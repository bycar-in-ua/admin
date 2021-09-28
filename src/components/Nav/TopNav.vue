<template>
  <div class="flex items-center h-full p-2">
    <div class="flex-grow" />
    <n-icon size="25" class="mr-2 cursor-pointer" title="Сменить тему">
      <star-half @click="themeSwitcher" />
    </n-icon>

    <n-dropdown
      trigger="hover"
      :options="options"
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

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { NAvatar, NDropdown, NIcon } from "naive-ui";
import { StarHalf } from "@vicons/ionicons5";
import { LOGOUT_USER } from "@/store/modules/auth/actionTypes";

export default {
  name: "TopNav",
  components: {
    NAvatar,
    NDropdown,
    NIcon,
    StarHalf,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const handlepsMap = {
      profile: () => {
        router.push({ name: "Profile" });
      },
      logout: async () => {
        await store.dispatch(LOGOUT_USER);
        router.push({ name: "Login" });
      },
    };

    function selectHandler(key) {
      handlepsMap[key]();
    }

    return {
      options: [
        {
          label: "Профиль",
          key: "profile",
        },
        {
          label: "Выйти",
          key: "logout",
        },
      ],
      selectHandler,
    };
  },
  inject: ["themeSwitcher"],
};
</script>
