<template>
  <n-layout>
    <n-layout-content>
      <div class="h-screen grid grid-cols-3 md:grid-cols-3">
        <div class="login-bg hidden md:block" :style="sideStyles" />
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
import useMemory from "@/hooks/useMemory";

export default {
  name: "LoginView",
  components: {
    Login,
    NLayout,
    NLayoutContent,
  },
  setup() {
    const memory = useMemory();

    const navBgImage = memory.get(
      "navBgImage",
      "https://images.unsplash.com/photo-1654447398834-4168622aab14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
    );

    const sideStyles = {
      background: `linear-gradient(
      0deg,
      rgba(3, 1, 40, 0.5) 0%,
      rgba(28, 10, 134, 0.4),
      rgba(14, 15, 114, 0.5) 47%
    ),
    url("${navBgImage}")`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    };

    return {
      sideStyles,
    };
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
