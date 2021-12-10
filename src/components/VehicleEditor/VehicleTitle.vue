<template>
  <n-h3 v-text="title" />
</template>

<script>
import { mapState } from "vuex";
import { NH3 } from "naive-ui";
import { prepareCarTitle } from "@/helpers/preparers";

export default {
  name: "VehicleTitle",
  computed: {
    ...mapState({
      car: (state) => state.carEditor.car,
    }),
    title() {
      return prepareCarTitle(this.car);
    },
  },
  components: {
    NH3,
  },
};
</script>
