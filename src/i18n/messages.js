import { generalRU, generalUA } from "./general";
import { vehicleRU, vehicleUA } from "./vehicle";
import { optionsRU, optionsUA } from "./options";
import { complectationRU, complectationUA } from "./complectations";

export default {
  ru: {
    ...generalRU,
    menuItems: {
      Dashboard: "Дашборд",
      Vehicles: "Автомобили",
      Brands: "Бренды",
    },
    vehicle: vehicleRU,
    options: optionsRU,
    complectations: complectationRU,
  },
  ua: {
    ...generalUA,
    menuItems: {
      Dashboard: "Дашборд",
      Vehicles: "Автомобілі",
      Brands: "Бренди",
    },
    vehicle: vehicleUA,
    options: optionsUA,
    complectations: complectationUA,
  },
};
