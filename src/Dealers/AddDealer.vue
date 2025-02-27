<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  NButton,
  NPopover,
  NForm,
  NFormItem,
  NInput,
  type FormRules,
  type FormInst,
} from "naive-ui";
import { useI18n } from "vue-i18n";
import { useMutation } from "@tanstack/vue-query";
import { useDealersService } from "./useDealersService";

const { t } = useI18n();

const formRef = ref<FormInst>();
const formModel = ref({
  name: "",
});

const rules: FormRules = {
  name: [{ required: true, message: "Введіть назву дилера", trigger: "blur" }],
};

const dealersService = useDealersService();
const router = useRouter();

const { mutate: createDealer, isPending } = useMutation({
  mutationFn: () => dealersService.createDealer({ name: formModel.value.name }),
  onSuccess: (dealer) => {
    router.push({ name: "EditDealer", params: { id: dealer.id } });
  },
});

async function onSubmit(e: Event) {
  e.preventDefault();

  await formRef.value.validate();

  await createDealer();
}
</script>

<template>
  <NPopover trigger="click" placement="bottom">
    <template #trigger>
      <NButton type="primary">
        {{ t("create") }}
      </NButton>
    </template>

    <NForm
      ref="formRef"
      size="small"
      inline
      :model="formModel"
      :rules
      :disabled="isPending"
      @submit="onSubmit"
    >
      <NFormItem label="Назва дилера" required path="name">
        <NInput
          v-model:value="formModel.name"
          type="text"
          placeholder="Введіть назву дилера"
        />
      </NFormItem>

      <NFormItem>
        <NButton
          type="primary"
          strong
          attr-type="submit"
          :disabled="!formModel.name"
          :loading="isPending"
        >
          +
        </NButton>
      </NFormItem>
    </NForm>
  </NPopover>
</template>
