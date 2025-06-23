export const yearValidator = (rule, value) => {
  console.log(value);
  if (rule.required & !value) {
    return new Error('Поле "рік" не може бути пустим');
  } else if (!/\d{4}/g.test(String(value)) || String(value).length !== 4) {
    return new Error("Введіть рік у форматі ХХХХ");
  }
};

export const slugValidator = (rule, value) => {
  if (rule.required & !value) {
    return new Error('Поле "slug" не може бути пустим');
  } else if (!/^[a-z0-9-]+$/g.test(value)) {
    return new Error(
      "Недопустимі символи. Можна використовувати тільки латинські літери в нижньому регістрі, цифри та знак дефісу (-)"
    );
  }
};
