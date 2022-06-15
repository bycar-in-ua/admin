<template>
  <pre v-text="profile" />
  <nav-bg-upload />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import NavBgUpload from "@/components/Profile/NavBgUpload";

export default {
  name: "Profile",
  components: {
    NavBgUpload,
  },
  setup() {
    const store = useStore();

    const profile = computed(() => store.state.auth.user);

    return {
      profile,
    };
  },
};
</script>
