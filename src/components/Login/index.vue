<script setup lang="ts">
import { ref } from "vue";
import {
  NCard,
  NButton,
  NForm,
  NFormItem,
  NInput,
  useLoadingBar,
  FormInst,
} from "naive-ui";
import { useNotification } from "naive-ui";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";

defineOptions({
  name: "Login",
});

const loading = useLoadingBar();
const notification = useNotification();
const { t } = useI18n();
const router = useRouter();
const authStore = useAuthStore();

const loginForm = ref<FormInst>();
const model = ref({
  email: "",
  password: "",
});
const isFetching = ref(false);

const rules = {
  email: {
    required: true,
    trigger: ["blur", "input"],
    message: "Это обязательное поле",
  },
  password: {
    required: true,
    trigger: ["blur", "input"],
    message: "Это обязательное поле",
  },
};

async function submitHandler() {
  try {
    isFetching.value = true;
    loading.start();
    await loginForm.value.validate();
    await authStore.loginUser(model.value);
    router.push({ name: "Dashboard" });
    loading.finish();
  } catch (e) {
    const error = e as Error;

    loading.error();
    notification.error({
      title: error.message,
      duration: 5000,
    });
  } finally {
    isFetching.value = false;
  }
}
</script>

<template>
  <n-card :title="t('adminPanelEnter')" class="shadow-lg max-w-lg" loading>
    <template #header-extra>
      <a href="https://bycar.in.ua/">bycar.in.ua</a>
    </template>
    <n-form
      ref="loginForm"
      :model="model"
      :rules="rules"
      :disabled="isFetching"
    >
      <n-form-item :label="t('email')" path="email">
        <n-input
          v-model:value="model.email"
          type="text"
          :placeholder="t('enterEmail')"
        />
      </n-form-item>
      <n-form-item :label="t('password')" path="password">
        <n-input
          v-model:value="model.password"
          type="password"
          :placeholder="t('enterPassword')"
        />
      </n-form-item>
    </n-form>

    <template #action>
      <div class="text-right">
        <n-button type="primary" :loading="isFetching" @click="submitHandler">
          {{ t("login") }}
        </n-button>
      </div>
    </template>
  </n-card>
</template>
