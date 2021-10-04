<template>
  <n-h3 v-text="title" />
</template>

<script>
import { mapState } from "vuex";
import { NH3 } from "naive-ui";

export default {
  name: "VehicleTitle",
  computed: {
    ...mapState({
      car: (state) => state.carEditor.car,
    }),
    title() {
      return `${this.car.brand.displayName} ${this.car.model} ${this.car.year}`;
    },
  },
  components: {
    NH3,
  },
};
</script>
