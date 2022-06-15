<template>
  <n-h3 v-text="title" />
</template>

<script>
import { mapState } from "vuex";
import { NH3 } from "naive-ui";
import { prepareCarTitle } from "@/helpers/preparers";

export default {
  name: "VehicleTitle",
  components: {
    NH3,
  },
  computed: {
    ...mapState({
      car: (state) => state.carEditor.car,
    }),
    title() {
      return prepareCarTitle(this.car);
    },
  },
};
</script>
