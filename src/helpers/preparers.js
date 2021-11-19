// DEPRECATED
// export const prepareCar = (car) => {
//   const fields = [
//     "status",
//     "model",
//     "year",
//     "description",
//     "dimensionL",
//     "dimensionW",
//     "dimensionH",
//     "clearance",
//     "wheelbase",
//     "curbWeight",
//     "fullWeight",
//     "numberOfSeats",
//     "gasTankVolume",
//     "trunkVolume",
//   ];
//   const preparedCar = {};

//   fields.forEach((field) => {
//     preparedCar[field] = car[field];
//   });
//   return preparedCar;
// };

export const prepareOption = (option) => {
  return {
    label: option.displayName,
    value: option.id,
  };
};

export const prepareOptionsByCategoties = (acc, cur) => {
  if (acc[cur.category.id]) {
    acc[cur.category.id].push(prepareOption(cur));
  } else {
    acc[cur.category.id] = [];
    acc[cur.category.id].push(prepareOption(cur));
  }
  return acc;
};

export const prepareOptionIdsByCategoties = (acc, cur) => {
  if (acc[cur.category.id]) {
    acc[cur.category.id].push(cur.id);
  } else {
    acc[cur.category.id] = [];
    acc[cur.category.id].push(cur.id);
  }
  return acc;
};
