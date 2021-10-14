<template>
  <n-layout>
    <n-layout-content>
      <div class="h-screen grid grid-cols-3 md:grid-cols-3">
        <div class="login-bg hidden md:block" />
        <div class="col-span-2 flex justify-center items-center">
          <Login />
        </div>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script>
import Login from "@/components/Login";
import { NLayout, NLayoutContent } from "naive-ui";

export default {
  name: "LoginView",
  components: {
    Login,
    NLayout,
    NLayoutContent,
  },
};
</script>

<style>
.login-bg {
  background-image: url("https://images.drive.ru/i/0/5e95a4eeec05c42d5e000028.jpg");
  background-size: cover;
  background-position: 25% center;
}
</style>
