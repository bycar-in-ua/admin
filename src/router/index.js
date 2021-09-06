import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import { FETCH_USER } from "@/store/modules/auth/actionTypes";
import Dashboard from "../views/Dashboard.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
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
    path: "/vehicles",
    name: "Vehicles",
    component: () => import("../views/Vehicles.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log(store, "store");
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
