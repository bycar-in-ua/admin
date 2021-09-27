export const statusOptions = [
  {
    label: "Черновик",
    value: "draft",
  },
  {
    label: "Опубликовано",
    value: "published",
  },
];

export const getStatusLabel = (status) =>
  statusOptions.find((item) => item.value == status)?.label;

export const getStatusTag = (status) => {
  const tags = { published: "success", draft: "warning" };
  return tags[status];
};
