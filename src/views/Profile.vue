<template>
  <pre v-text="profile" />
  <nav-bg-upload />
</template>

<script>
import NavBgUpload from "@/components/Profile/NavBgUpload";
import { useAuthStore } from "@/stores/auth.store";

export default {
  name: "Profile",
  components: {
    NavBgUpload,
  },
  setup() {
    const authStore = useAuthStore();
    return {
      profile: authStore.user,
    };
  },
};
</script>
