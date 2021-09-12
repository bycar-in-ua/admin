import { createStore } from "vuex";
import library from "./modules/library";
import auth from "./modules/auth";
import brands from "./modules/brands";

export default createStore({
  modules: { library, auth, brands },
});
