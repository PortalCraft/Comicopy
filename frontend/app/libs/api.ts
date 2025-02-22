import { paramsToFormData, request } from "@/lib/api";

type SearchListParams = {
  manga: string;
  limit?: number;
};

type SearchListResponse = {
  data: {
    limit: number;
    list: Manga[];
    offset: number;
    total: number;
  };
  success: boolean;
};

type Manga = {
  alias: string;
  author: Author[];
  cover: string;
  females: string[];
  males: string[];
  name: string;
  parodies: string[];
  path_word: string;
  popular: number;
  theme: string[];
};

type Author = {
  alias: string;
  name: string;
  path_word: string;
};

export const searchList = (params: SearchListParams) => {
  return request.post("/search", paramsToFormData(params)) as Promise<SearchListResponse>;
};
