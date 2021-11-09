import { generalRU, generalUA } from "./general";
import { infoRU, infoUA } from "./info";
import { vehicleRU, vehicleUA } from "./vehicle";
import { optionsRU, optionsUA } from "./options";
import { complectationRU, complectationUA } from "./complectations";
import { imagesRU, imagesUA } from "./images";

export default {
  ru: {
    ...generalRU,
    info: infoRU,
    menuItems: {
      Dashboard: "Дашборд",
      Vehicles: "Автомобили",
      Brands: "Бренды",
      Library: "Библиотека",
      Images: imagesRU.title,
    },
    vehicle: vehicleRU,
    options: optionsRU,
    complectations: complectationRU,
    images: imagesRU,
  },
  ua: {
    ...generalUA,
    info: infoUA,
    menuItems: {
      Dashboard: "Дашборд",
      Vehicles: "Автомобілі",
      Brands: "Бренди",
      Library: "Бібліотека",
      Images: imagesUA.title,
    },
    vehicle: vehicleUA,
    options: optionsUA,
    complectations: complectationUA,
    images: imagesUA,
  },
};
