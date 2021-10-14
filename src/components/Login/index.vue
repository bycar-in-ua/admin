<template>
  <n-card :title="t('adminPanelEnter')" class="shadow-lg max-w-lg" loading>
    <template #header-extra>
      <a href="https://bycar.in.ua/">bycar.in.ua</a>
    </template>
    <n-form
      :model="model"
      :rules="rules"
      ref="loginForm"
      :disabled="isFetching"
    >
      <n-form-item :label="t('userName')" path="username">
        <n-input
          type="text"
          :placeholder="t('enterUserName')"
          v-model:value="model.username"
        />
      </n-form-item>
      <n-form-item :label="t('password')" path="password">
        <n-input
          type="password"
          :placeholder="t('enterPassword')"
          v-model:value="model.password"
        />
      </n-form-item>
    </n-form>

    <template #action>
      <div class="text-right">
        <n-button type="primary" @click="submitHandler">
          <n-spin v-if="isFetching" stroke="white" />
          <template v-else> {{ t("login") }} </template>
        </n-button>
      </div>
    </template>
  </n-card>
</template>

<script>
import {
  NCard,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NSpin,
  useLoadingBar,
} from "naive-ui";
import { mapActions } from "vuex";
import { LOGIN_USER } from "../../store/modules/auth/actionTypes";
import useErrorHandler from "../../hooks/useErrorHandler";
import { useNotification } from "naive-ui";
import { useI18n } from "vue-i18n";

export default {
  name: "Login",
  components: {
    NCard,
    NButton,
    NForm,
    NFormItem,
    NInput,
    NSpin,
  },
  setup() {
    const loading = useLoadingBar();
    const notification = useNotification();
    const { handleError } = useErrorHandler(notification);
    const { t } = useI18n();

    return {
      loading,
      handleError,
      t,
    };
  },
  data: () => ({
    model: {
      username: "",
      password: "",
    },
    rules: {
      username: {
        required: true,
        trigger: ["blur", "input"],
        message: "Это обязательное поле",
      },
      password: {
        required: true,
        trigger: ["blur", "input"],
        message: "Это обязательное поле",
      },
    },
    isFetching: false,
  }),
  methods: {
    ...mapActions({
      loginUser: LOGIN_USER,
    }),
    async submitHandler() {
      try {
        this.isFetching = true;
        this.loading.start();
        await this.$refs.loginForm.validate();
        await this.loginUser(this.model);
        this.$router.push({ name: "Dashboard" });
        this.loading.finish();
        this.isFetching = false;
      } catch (error) {
        this.loading.error();
        this.isFetching = false;
        this.handleError(error?.message, "Возникла ошибка при входе");
      }
    },
  },
};
</script>
