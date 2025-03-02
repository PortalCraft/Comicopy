import { objectToFormData, request } from "@/lib/api";

// ------------ 获取漫画详情

type GetMangaInfoParams = {
  id: string;
  type?: number;
};

type GetMangaInfoResponse = {
  success: boolean;
  data: {
    build: {
      path_word: string;
      type: {
        id: number;
        name: string;
      }[];
    };
    groups: {
      default: {
        chapters: {
          id: string;
          name: string;
          type: number;
        }[];
        count: number;
        last_chapter: {
          comic_id: string;
          comic_path_word: string;
          count: number;
          datetime_created: string;
          group_id: null | string;
          group_path_word: string;
          img_type: number;
          index: number;
          name: string;
          news: string;
          next: null | string;
          ordered: number;
          prev: null | string;
          size: number;
          type: number;
          uuid: string;
        };
        name: string;
        path_word: string;
      };
    };
  };
}

export type MangaInfo = ReturnType<typeof selectMangaInfo>;

const selectMangaInfo = (response: string, params: GetMangaInfoParams) => {
  const { data } = JSON.parse(response) as GetMangaInfoResponse;
  const { build, groups } = data ?? {};
  const { type = build.type[0].id } = params;
  return {
    id: build.path_word,
    type: build.type,
    chapters: groups.default.chapters.filter((chapter) => chapter.type === type),
  };
};

export const getMangaInfo = async (params: GetMangaInfoParams) => {
  const { id } = params;
  const body = {
    manga: id,
  };
  return request.post(
    "/info",
    objectToFormData(body),
    {
      transformResponse: (response) => selectMangaInfo(response, params),
    },
  ) as Promise<MangaInfo>;
};

// ------------ 获取章节图片列表

type GetChapterPhotosParams = {
  mangaID: string;
  type?: number;
  chapterID: string;
};

type GetChapterPhotosResponse = {
  success: boolean;
  data: {
    order: number;
    url: {
      url: string;
    };
  }[];
};

export type ChapterPhotos = ReturnType<typeof selectChapterPhotos>;

const selectChapterPhotos = (response: string) => {
  const { data } = JSON.parse(response) as GetChapterPhotosResponse;
  return data
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      order: item.order,
      url: item.url.url,
    }));
};

export const getChapterPhotos = async (params: GetChapterPhotosParams) => {
  const {
    mangaID,
    chapterID,
  } = params;

  const body = {
    manga: mangaID,
    chapter: chapterID,
  };
  return request.post(
    "/chapter",
    objectToFormData(body),
    {
      transformResponse: selectChapterPhotos,
    },
  ) as Promise<ChapterPhotos>;
};