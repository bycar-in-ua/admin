export const yearValidator = (rule, value) => {
  console.log(value);
  if (rule.required & !value) {
    return new Error("Поле Год не может быть пустым");
  } else if (!/\d{4}/g.test(String(value)) || String(value).length !== 4) {
    return new Error("Введите год в фомате ХХХХ");
  }
};

export const slugValidator = (rule, value) => {
  if (rule.required & !value) {
    return new Error("Поле Slug не может быть пустым");
  } else if (!/^[a-z0-9-]+$/g.test(value)) {
    return new Error(
      "Недопустимые символы. Можно использовать только буквы латинского алфавита в нижнем регистре, цифры и знак дефиса (-)"
    );
  }
};
