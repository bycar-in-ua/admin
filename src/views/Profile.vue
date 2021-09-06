<template>
  <pre>
  {{ profile }}
</pre
  >
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "Profile",
  setup() {
    const store = useStore();

    const profile = computed(() => store.state.auth.user);

    return {
      profile,
    };
  },
};
</script>
