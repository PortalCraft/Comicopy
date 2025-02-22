"use client";

import { useInfiniteScroll } from "ahooks";
import { useEffect, useRef } from "react";
import { searchList } from "../libs/api";

type Props = {
  keywords?: string;
};

const List = (props: Props) => {
  const { keywords } = props;

  // 搜索关键词变化后发出请求，支持自动滚动翻页
  const containerRef = useRef<HTMLDivElement>(null);
  const { data, loading, reload, } = useInfiniteScroll(
    async (d) => {
      const page = (d?.page ?? 0) + 1;
      const response = await searchList({
        manga: keywords!,
        limit: page,
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
      target: containerRef,
      isNoMore: (d) => !d?.page,
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
    <div ref={containerRef}>
      <pre>
        {JSON.stringify(data?.list, null, 3)}
      </pre>
    </div>
  );
};

export default List;