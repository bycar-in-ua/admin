export const prepareOption = (option) => {
  return {
    label: option.displayName,
    value: option.id,
  };
};

export const prepareOptionsByCategoties = (acc, cur) => {
  if (acc[cur.category]) {
    acc[cur.category].push(prepareOption(cur));
  } else {
    acc[cur.category] = [];
    acc[cur.category].push(prepareOption(cur));
  }
  return acc;
};

export const prepareOptionIdsByCategoties = (acc, cur) => {
  if (acc[cur.categoryId]) {
    acc[cur.categoryId].push(cur.id);
  } else {
    acc[cur.categoryId] = [];
    acc[cur.categoryId].push(cur.id);
  }
  return acc;
};

/**
 *
 * @deprecated
 */
export const prepareCar = (car) => {
  for (let i = 0; i < car.complectations.length; i++) {
    car.complectations[i].powerUnits.sort((a, b) => a.id - b.id);
  }

  return car;
};

/**
 *
 *  @deprecared
 */
export const prepareCarTitle = (car) => {
  let title = "";

  title += car.brand.displayName + " ";

  title += car.model + " ";

  title += car.yearFrom + " ";

  if (car.yearTo) title += "- " + car.yearTo;

  return title;
};

export const flatObject = (obj) =>
  Object.entries(obj).flatMap((item) => item[1]);
