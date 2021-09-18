export const yearValidator = (rule, value) => {
  if (!value) {
    return new Error("Поле Год не может быть пустым");
  } else if (!/\d{4}/g.test(value) || value.length !== 4) {
    return new Error("Введите год в фомате ХХХХ");
  }
};
