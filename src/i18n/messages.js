import { generalRU, generalUA } from "./general";
import { infoRU, infoUA } from "./info";
import { vehicleRU, vehicleUA } from "./vehicle";
import { optionsRU, optionsUA } from "./options";
import { complectationRU, complectationUA } from "./complectations";

export default {
  ru: {
    ...generalRU,
    info: infoRU,
    menuItems: {
      Dashboard: "Дашборд",
      Vehicles: "Автомобили",
      Brands: "Бренды",
      Library: "Библиотека",
    },
    vehicle: vehicleRU,
    options: optionsRU,
    complectations: complectationRU,
  },
  ua: {
    ...generalUA,
    info: infoUA,
    menuItems: {
      Dashboard: "Дашборд",
      Vehicles: "Автомобілі",
      Brands: "Бренди",
      Library: "Бібліотека",
    },
    vehicle: vehicleUA,
    options: optionsUA,
    complectations: complectationUA,
  },
};
