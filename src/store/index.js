import { createStore } from "vuex";
import library from "./modules/library";
import auth from "./modules/auth";
import carEditor from "./modules/carEditor";

export default createStore({
  modules: { library, auth, carEditor },
});
