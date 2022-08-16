import { createStore } from "vuex";
import library from "./modules/library";
import auth from "./modules/auth";
import brands from "./modules/brands";
import carEditor from "./modules/carEditor";

export default createStore({
  modules: { library, auth, brands, carEditor },
});
