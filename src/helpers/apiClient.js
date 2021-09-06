import validateResponse from "./validateResponse";

//TODO отрефакторить это дерьмо
const API_URL = "http://localhost:3000";

export const get = async (path) => {
  try {
    const response = await fetch(API_URL + path, {
      credentials: "include",
    });
    await validateResponse(response);
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const post = async (path, body) => {
  try {
    const response = await fetch(API_URL + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
    await validateResponse(response);
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  get,
  post,
};
