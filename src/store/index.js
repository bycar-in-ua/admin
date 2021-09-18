import { createStore } from "vuex";
import library from "./modules/library";
import auth from "./modules/auth";
import brands from "./modules/brands";
import cars from "./modules/cars";
import carEditor from "./modules/carEditor";

export default createStore({
  modules: { library, auth, brands, cars, carEditor },
});
