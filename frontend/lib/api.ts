import axios from "axios";

export const request = axios.create({
  baseURL: `${location.protocol}//${location.hostname}:4718/api`,
});

request.interceptors.response.use((response) => {
  return response.data;
});

export const objectToFormData = (params: Record<string, unknown>) => {
  const formData = new FormData();
  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  return formData;
};