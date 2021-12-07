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

export const prepareCar = (car) => {
  car.complectations.sort((a, b) => a.id - b.id);

  for (let i = 0; i < car.complectations.length; i++) {
    car.complectations[i].powerUnits.sort((a, b) => a.id - b.id);
  }

  return car;
};
