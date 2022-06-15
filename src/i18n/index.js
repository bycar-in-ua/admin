import complectations from "@common/translations/complectations.json";
import colors from "@common/translations/colors.json";
import general from "@common/translations/general.json";
import images from "@common/translations/images.json";
import info from "@common/translations/info.json";
import notifications from "@common/translations/notifications.json";
import options from "@common/translations/options.json";
import vehicle from "../../common/translations/vehicle.json";

export default {
  ua: {
    ...general.ua,
    info: info.ua,
    menuItems: {
      Dashboard: "Дашборд",
      Vehicles: "Автомобілі",
      Brands: "Бренди",
      Library: "Бібліотека",
      Images: images.ua.title,
    },
    vehicle: vehicle.ua,
    options: options.ua,
    complectations: complectations.ua,
    images: images.ua,
    colors: colors.ua,
    notifications: notifications.ua,
  },
  ru: {
    ...general.ru,
    info: info.ru,
    menuItems: {
      Dashboard: "Дашборд",
      Vehicles: "Автомобили",
      Brands: "Бренды",
      Library: "Библиотека",
      Images: images.ru.title,
    },
    vehicle: vehicle.ru,
    options: options.ru,
    complectations: complectations.ru,
    images: images.ru,
    colors: colors.ru,
    notifications: notifications.ru,
  },
};
