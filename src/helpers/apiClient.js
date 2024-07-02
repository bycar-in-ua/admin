import { API_URL, CDN_URL } from "@/constants";
import validateResponse from "./validateResponse";

export const get = async (path) => {
  try {
    const response = await fetch(API_URL + path, {
      credentials: "include",
    });
    return await validateResponse(response);
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
    return await validateResponse(response);
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
    return await validateResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const remove = async (path, body) => {
  try {
    const response = await fetch(API_URL + path, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
    return await validateResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * @param {Array.<File>} files Files to uploa
 * @param {string} path Path to save images
 * @returns {Array.<string>} Array of saved files pathes
 */
export const uploadFiles = async (files, path = "") => {
  try {
    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      formData.append(files[index].name, files[index]);
    }
    formData.append("path", path);
    const response = await fetch(`${API_URL}/images`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    return await validateResponse(response);
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
