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
      let title = "";

      title += this.car.brand.displayName + " ";

      title += this.car.model + " ";

      title += this.car.yearFrom + " ";

      if (this.car.yearTo) title += "- " + this.car.yearTo;

      return title;
    },
  },
  components: {
    NH3,
  },
};
</script>
