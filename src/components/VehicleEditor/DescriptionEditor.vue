<template>
  <editor
    apiKey="bkij2k10jssrm5ez30czeck0fluycxbi0p1watets0n39u8n"
    :init="{
      height: 400,
      menubar: false,
      skin: darkTheme == '1' ? 'oxide-dark' : '',
      content_css: darkTheme == '1' ? 'dark' : '',
    }"
    v-model="desriptionModel"
  />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useMemory } from "@/hooks/useMemory";
import Editor from "@tinymce/tinymce-vue";
import { carEditorNamespace } from "@/store/modules/carEditor";
import { UPDATE_CAR_FIELD } from "@/store/modules/carEditor/mutationTypes";

export default {
  name: "DescriptionEditor",
  setup() {
    const store = useStore();
    const car = computed(() => store.state.carEditor.car);
    const memory = useMemory();

    const darkTheme = memory.get("darkTheme", false);

    const desriptionModel = computed({
      get: () => car.value.description,
      set: (val) =>
        store.commit(carEditorNamespace(UPDATE_CAR_FIELD), [
          "description",
          val,
        ]),
    });

    return {
      desriptionModel,
      darkTheme,
    };
  },
  components: {
    Editor,
  },
};
</script>
