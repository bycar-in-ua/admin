import { createStore } from "vuex";
import auth from "./modules/auth";
import brands from "./modules/brands";

export default createStore({
  modules: { auth, brands },
});
