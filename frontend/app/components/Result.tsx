"use client";

import { useInfiniteScroll } from "ahooks";
import { useEffect } from "react";
import { searchList } from "../libs/api";

type Props = {
  keywords?: string;
};

const SEARCH_LIMIT = 10;

const List = (props: Props) => {
  const { keywords } = props;

  // 搜索关键词变化后发出请求，支持自动滚动翻页
  const { data, loading, reload, } = useInfiniteScroll(
    async (d) => {
      const page = (d?.page ?? -1) + 1;
      const pageSize = SEARCH_LIMIT;
      const response = await searchList({
        manga: keywords!,
        limit: String(pageSize),
        offset: String(page * pageSize),
      });

      const { data } = response;
      const { list } = data ?? {};
      const hasList = Array.isArray(list) && list.length > 0;

      return {
        list: hasList ? list : [],
        page: hasList ? page : undefined,
      }
    },
    {
      manual: true,
      target: document,
      threshold: window.innerHeight,
      isNoMore: (d) => d?.page === undefined,
    }
  );

  useEffect(() => {
    if (!keywords) return;
    reload();
  }, [keywords, reload]);

  if (loading) {
    return "loading";
  }

  return (
    <div>
      {data?.list.map((item, index) => (
        <pre key={index}>
          {JSON.stringify(item, null, 3)}
        </pre>
      ))}
    </div>
  );
};

export default List;