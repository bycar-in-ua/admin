export const statuses = ["draft", "published"];

export const getStatusTag = (status) => {
  const tags = { published: "success", draft: "warning" };
  return tags[status];
};
