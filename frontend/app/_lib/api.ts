import { objectToFormData, request } from "@/lib/api";

type SearchListParams = {
  keywords: string;
  page?: number;
  pageSize?: number;
};

type SearchListResponse = {
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
};

export type SearchList = ReturnType<typeof selectSearchList>;

const selectSearchList = (response: string) => {
  const { data } = JSON.parse(response) as SearchListResponse;
  const { list } = data ?? {};
  return list?.map((item) => ({
    id: item.path_word,
    title: item.name,
    cover: item.cover,
    authors: item.author.map((author) => ({
      id: author.path_word,
      name: author.name,
    })),
    popular: item.popular,
  }));
};

export const searchList = async (params: SearchListParams) => {
  const { keywords, page = 0, pageSize = 12 } = params;
  const body = {
    manga: keywords,
    limit: String(pageSize),
    offset: String(page * pageSize),
  };
  return request.post(
    "/search",
    objectToFormData(body),
    {
      transformResponse: selectSearchList,
    },
  ) as Promise<SearchList>;
};
