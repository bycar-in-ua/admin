export default function useErrorHandler(notification) {
  const handleError = (
    message = "Что-то пошло не так",
    title = undefined,
    duration = 5000
  ) => {
    notification.error({
      meta: message,
      title,
      duration,
    });
  };

  return {
    handleError,
  };
}
