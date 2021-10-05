import { API_URL, CDN_URL } from "@/constants";
import validateResponse from "./validateResponse";

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

export const put = async (path, body) => {
  try {
    const response = await fetch(API_URL + path, {
      method: "PUT",
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

export const remove = async (path) => {
  try {
    const response = await fetch(API_URL + path, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      credentials: "include",
    });
    await validateResponse(response);
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const uploadFiles = async (path, files) => {
  try {
    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      formData.append(files[index].name, files[index]);
    }
    const response = await fetch(CDN_URL + path, {
      method: "POST",
      body: formData,
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
  put,
  uploadFiles,
  delete: remove,
};
