export const driveTypes = [
  {
    label: "Передний",
    value: "FWD",
  },
  {
    label: "Полный",
    value: "AWD",
  },
  {
    label: "Задний",
    value: "RWD",
  },
];

export const getDriveType = (drive) =>
  driveTypes.find((item) => item.value === drive);

export const gearboxTypes = [
  {
    label: "АКПП",
    value: "automatic",
  },
  {
    label: "МКПП",
    value: "mechanical",
  },
  {
    label: "Вариатор",
    value: "variator",
  },
];

export const getGearboxType = (gerbox) =>
  gearboxTypes.find((item) => item.value === gerbox);
