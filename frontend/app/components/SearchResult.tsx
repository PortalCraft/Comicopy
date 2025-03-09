'use client';

import { AspectRatio } from '@/app/components/ui/aspect-ratio';
import { Skeleton } from '@/app/components/ui/skeleton';
import { searchAtom } from '@/app/stores/search';
import { useAtom } from 'jotai';
import { PropsWithChildren, use, useCallback, useEffect, useMemo, useRef } from 'react';
import useSWRInfinite from 'swr/infinite';
import { BREAKPOINTS, useBreakpoint } from '../hooks/use-breakpoint';
import { searchList, SearchListParams, SearchListResponse } from '../lib/api';
import { queryStringToObject } from '../lib/utils';
import ResultItem from './ResultItem';
import { useIntersection } from 'react-use';

const SEARCH_LIMIT = 30;

const Container = (props: PropsWithChildren) => {
  const { children } = props;

  const breakpoint = useBreakpoint();
  const columnCount = useMemo(() => {
    if (breakpoint === BREAKPOINTS['2xl']) return 7;
    if (breakpoint === BREAKPOINTS.xl) return 6;
    if (breakpoint === BREAKPOINTS.lg) return 5;
    if (breakpoint === BREAKPOINTS.md) return 4;
    if (breakpoint === BREAKPOINTS.sm) return 3;
    return 2;
  }, [breakpoint]);

  return (
    <div
      className='relative grid gap-2 px-4 mt-8'
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
      }}
    >
      {children}
    </div>
  )
};

const SearchResult = () => {
  const [search, setSearch] = useAtom(searchAtom);

  // swr缓存键，里面的查询参数可以转为formData传给接口
  const getKey = useCallback((page: number, prevData?: SearchListResponse) => {
    if (!search.canSearch || !search.keywords) return null;
    if (prevData && !prevData.data.list.length) return null;
    return `/search?keywords=${search.keywords}&page=${page + 1}`;
  }, [search]);

  const {
    data,
    isLoading,
    setSize,
  } = useSWRInfinite(
    (page, prevData) => getKey(page, prevData),
    (key) => {
      const params = queryStringToObject(key) as SearchListParams;
      setSearch((prev) => ({ ...prev, canSearch: false }));
      return searchList(params);
    }
  );

  const items = useMemo(() => data?.flatMap((item) => item.data.list) ?? [], [data]);

  const isEmpty = items.length === 0;

  // 滚动加载下一页
  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderIntersection = useIntersection(loaderRef, {});
  const canLoadMore = !isLoading && !isEmpty && loaderIntersection?.isIntersecting;
  const loadMore = () => {
    setSize((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <Container>
        {Array.from({ length: SEARCH_LIMIT }).map((_, index) => (
          <AspectRatio key={index} ratio={350 / 500}>
            <Skeleton className='size-full rounded-xl' />
          </AspectRatio>
        ))}
      </Container>
    )
  }

  return (
    <Container>
      {items.map((item) => (
        <ResultItem key={item.path_word} {...item} />
      ))}
      {canLoadMore && (
        <div
          ref={loaderRef}
          className='absolute bottom-1/2'
          onClick={loadMore}
        />
      )}
    </Container>
  );
};

export default SearchResult;