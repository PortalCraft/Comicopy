import axios from 'axios';
import { objectToFormData } from './utils';

export const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

request.interceptors.response.use((response) => {
  return response.data;
});

// ------------ 搜索漫画列表

export type SearchListParams = {
  keywords: string;
  page?: number;
  pageSize?: number;
};

export type SearchListResponse = {
  success: boolean;
  data: {
    limit: number;
    list: {
      alias: string;
      author: {
        alias: string;
        name: string;
        path_word: string;
      }[];
      cover: string;
      females: string[];
      males: string[];
      name: string;
      parodies: string[];
      path_word: string;
      popular: number;
      theme: string[];
    }[];
    offset: number;
    total: number;
  };
}

export const searchList = async (params: SearchListParams): Promise<SearchListResponse> => {
  const { keywords, page = 1, pageSize = 12 } = params;
  const body = {
    manga: keywords,
    limit: String(pageSize),
    offset: String((page - 1) * pageSize),
  };
  return request.post("/search", objectToFormData(body));
};