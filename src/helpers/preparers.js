export const prepareCar = (car) => {
  const fields = [
    "status",
    "model",
    "year",
    "description",
    "dimensionL",
    "dimensionW",
    "dimensionH",
    "clearance",
    "wheelbase",
    "curbWeight",
    "fullWeight",
    "numberOfSeats",
    "gasTankVolume",
    "trunkVolume",
  ];
  const preparedCar = {};

  fields.forEach((field) => {
    preparedCar[field] = car[field];
  });
  return preparedCar;
};
