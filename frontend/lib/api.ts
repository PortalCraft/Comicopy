import axios from "axios";

export const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
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