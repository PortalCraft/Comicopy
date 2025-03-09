'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { useMemo } from 'react';
import { useWindowScroll } from 'react-use';

type Props = {
  total?: number;
};

const Pagination = (props: Props) => {
  const { total = 0 } = props;

  // 计算当前页码
  const { y: windowScrollY } = useWindowScroll();
  const page = useMemo(() => {
    return Math.ceil(windowScrollY / window.innerHeight);
  }, [windowScrollY]);

  // 滚动到指定页码
  const onChangeValue = (value: string) => {
    const nextPage = Number(value);
    window.scrollTo({
      // X页 = X屏的高度 + 前X页间距
      top: (nextPage - 1) * window.innerHeight + (nextPage - 1) * 16,
      behavior: 'smooth',
    });
  };

  return (
    <Select value={String(page)} onValueChange={onChangeValue}>
      <SelectTrigger className='sticky top-4 w-24 focus:ring-0'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: total }).map((_, index) => (
          <SelectItem key={index} value={String(index + 1)}>
            {index + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Pagination;