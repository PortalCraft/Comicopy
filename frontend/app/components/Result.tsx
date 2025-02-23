"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useInfiniteScroll, useSize } from "ahooks";
import { Masonry, RenderComponentProps } from "masonic";
import { CSSProperties, PropsWithChildren, useCallback, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { SearchList, searchList } from "../lib/api";
import ResultItem from "./ResultItem";

type Props = {
  keywords?: string;
};

type GetListResponse = {
  list: SearchList;
  page?: number;
};

const SEARCH_LIMIT = 30;

const Container = (props: PropsWithChildren<{ className?: string; style?: CSSProperties }>) => {
  const { className, style, children } = props;
  return (
    <div className={cn("mt-8 px-4", className)} style={style}>
      {children}
    </div>
  )
};

const List = (props: Props) => {
  const { keywords } = props;

  const MasonryItem = useCallback(({ data }: RenderComponentProps<SearchList[number]>) => {
    return (
      <ResultItem {...data} />
    )
  }, []);

  /**
   * 搜索逻辑
   * 关键词变化后发出请求
   * 滚动到阈值自动翻页
   */

  const getList = useCallback(async (keywords?: string, currentPage?: number) => {
    const result: GetListResponse = {
      list: [],
      page: undefined,
    };

    if (!keywords) return result;

    const page = (currentPage ?? -1) + 1;
    const pageSize = SEARCH_LIMIT;
    const list = await searchList({ keywords, page, pageSize });

    const hasList = Array.isArray(list) && list.length > 0;
    if (hasList) {
      result.list = list;
      result.page = page;
    } else if (page === 0) {
      toast.info("没有找到相关漫画");
    }

    return result;
  }, []);

  const { data, loading, reload } = useInfiniteScroll<GetListResponse>((d) => getList(keywords, d?.page), {
    manual: true,
    target: window.document,
    threshold: window.innerHeight,
    isNoMore: (d) => d?.page === undefined,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (!keywords) return;
    reload();
  }, [keywords, reload]);

  /**
   * 拿到数据，进行渲染
   */

  const items = useMemo(() => data?.list ?? [], [data]);

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

  if (loading) {
    return (
      <Container
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        }}
      >
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
      <Masonry
        items={items}
        render={MasonryItem}
        rowGutter={8}
        columnGutter={8}
        columnCount={columnCount}
      />
    </Container>
  );
};

export default List;