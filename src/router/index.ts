import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import { useAuthStore } from "@/stores/auth.store";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: {
      layout: "LoginLayout",
    },
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
  },
  {
    path: "/vehicles",
    name: "Vehicles",
    component: () => import("@/views/Vehicles.vue"),
    meta: {
      title: ["car", 2],
    },
  },
  {
    path: "/vehicles/:slug",
    name: "EditVehicle",
    component: () => import("@/views/EditVehicle.vue"),
  },
  {
    path: "/brands",
    name: "Brands",
    component: () => import("@/views/Brands.vue"),
    meta: {
      title: ["brand", 2],
    },
  },
  {
    path: "/library",
    name: "Library",
    component: () => import("@/views/Library.vue"),
  },
  {
    path: "/images",
    name: "Images",
    component: () => import("@/views/Images.vue"),
    meta: {
      title: ["images.title", 2],
    },
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("@/views/Users.vue"),
    meta: {
      title: ["users.title", 2],
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  if (!authStore.isLoggedIn && !authStore.isFetched) {
    try {
      await authStore.fetchUser();
    } catch (error) {
      console.log(error);
    }
  }

  if (authRequired && !authStore.isLoggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
