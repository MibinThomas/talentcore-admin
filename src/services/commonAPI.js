// src/services/commonAPI.js
import axiosClient from "./axiosClient";

export const commonAPI = async (httpRequest, url, reqBody = {}, options = {}) => {
  try {
    const result = await axiosClient({
      method: httpRequest,
      url,
      data: reqBody,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      withCredentials: true, // always send cookies
    });
    return result;
  } catch (error) {
    throw error;
  }
};

