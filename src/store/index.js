import { createStore } from "vuex";
import library from "./modules/library";
import auth from "./modules/auth";

export default createStore({
  modules: { library, auth },
});
