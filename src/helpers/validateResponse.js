export const validateResponse = async (response) => {
  const responseStatus = /^[2]\d+/g;

  if (!responseStatus.test(response.status)) {
    const res = await response.json();
    throw new Error(res.message || "Something went wrong");
  }
  return await response.json();
};

export default validateResponse;
