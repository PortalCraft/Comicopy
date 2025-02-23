"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { searchAtom } from "@/stores/search";
import { useInfiniteScroll, useSize } from "ahooks";
import { useAtom } from "jotai";
import { PropsWithChildren, useCallback, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { SearchList, searchList } from "../_lib/api";
import ResultItem from "./ResultItem";

type GetListResponse = {
  list: SearchList;
  page?: number;
};

const SEARCH_LIMIT = 30;

const Container = (props: PropsWithChildren) => {
  const { children } = props;

  const bodySize = useSize(document.body);
  const columnCount = useMemo(() => {
    if (!bodySize) return 2;
    const { width: bodyWidth } = bodySize;
    if (bodyWidth > 1536) return 7;
    if (bodyWidth > 1280) return 6;
    if (bodyWidth > 1024) return 5;
    if (bodyWidth > 768) return 4;
    if (bodyWidth > 576) return 3;
    return 2;
  }, [bodySize]);

  return (
    <div
      className="grid gap-2 px-4 mt-8"
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
      }}
    >
      {children}
    </div>
  )
};

const List = () => {
  /**
   * 搜索相关逻辑
   */

  const [search, setSearch] = useAtom(searchAtom);

  const getList = useCallback(async (currentPage?: number) => {
    const result: GetListResponse = {
      list: [],
      page: undefined,
    };

    const { keywords } = search;
    if (keywords) {
      const page = (currentPage ?? -1) + 1;
      const pageSize = SEARCH_LIMIT;
      const list = await searchList({ keywords, page, pageSize });

      const hasList = Array.isArray(list) && list.length > 0;
      if (hasList) {
        result.list = list;
        result.page = page;
      } else {
        if (page === 0) {
          toast.info("没有找到相关漫画");
        }
      }
    }

    return result;
  }, [search]);

  const { data, loading, reload } = useInfiniteScroll<GetListResponse>((d) => getList(d?.page), {
    manual: true,
    target: window.document,
    threshold: window.innerHeight,
    isNoMore: (d) => d?.page === undefined,
    onError: (error) => {
      toast.error(error.message);
    },
    onFinally: () => {
      setSearch({ ...search, isSearching: false });
    },
  });

  useEffect(() => {
    if (search.isSearching) {
      reload();
    }
  }, [search.isSearching, reload]);

  /**
   * 拿到数据，进行渲染
   */

  const items = useMemo(() => data?.list ?? [], [data]);

  if (loading) {
    return (
      <Container>
        {Array.from({ length: SEARCH_LIMIT }).map((_, index) => (
          <AspectRatio key={index} ratio={350 / 500}>
            <Skeleton className="size-full rounded-xl" />
          </AspectRatio>
        ))}
      </Container>
    )
  }

  return (
    <Container>
      {items.map((item) => (
        <ResultItem key={item.id} {...item} />
      ))}
    </Container>
  );
};

export default List;