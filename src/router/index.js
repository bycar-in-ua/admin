import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import { FETCH_USER } from "@/store/modules/auth/actionTypes";
import Dashboard from "@/views/Dashboard.vue";

const routes = [
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
    path: "/vehicles/:id",
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  if (!store.getters.isLogedIn) {
    try {
      await store.dispatch(FETCH_USER);
    } catch (error) {
      console.log(error);
    }
  }

  if (authRequired && !store.getters.isLogedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
