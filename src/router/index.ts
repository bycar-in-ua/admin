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
    components: {
      default: () => import("@/views/Vehicles.vue"),
      "title-extra": () =>
        import("@/Vehicles/CreateVehicleModal.vue"),
    },
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
    components: {
      default: () => import("@/views/Brands.vue"),
      "title-extra": () => import("@/Brands/AddBrandButton.vue"),
    },
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
    name: "Dealers",
    path: "/dealers",
    components: {
      default: () => import("@/views/Dealers.vue"),
      "title-extra": () => import("@/Dealers/AddDealer.vue"),
    },
    meta: {
      title: "Дилери",
    },
  },
  {
    name: "EditDealer",
    path: "/dealers/:id",
    component: () => import("@/views/EditDealer.vue"),
    meta: {
      title: "Редагування дилера",
    },
  },
  {
    name: "AvailableVehicles",
    path: "/available-vehicles",
    components: {
      default: () => import("@/views/AvailableVehicles.vue"),
      "title-extra": () =>
        import("@/AvailableVehicles/AddAvailableVehicle/AddAvailableVehicleButton.vue"),
    },
    meta: {
      title: "Автомобілі в наявності",
    },
  },
  {
    name: "EditAvailableVehicle",
    path: "/available-vehicles/:id",
    components: {
      default: () => import("@/views/EditAvailableVehicle.vue"),
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
