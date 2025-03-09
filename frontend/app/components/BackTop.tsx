'use client'

import { cn } from '@/app/lib/utils';
import { useScroll } from 'ahooks';
import { ChevronUp } from 'lucide-react';
import { useMemo } from 'react';
import { Button } from './ui/button';

type Props = {
  scroller?: HTMLElement | null;
  className?: string;
};

const BackTop = (props: Props) => {
  const {
    scroller = typeof window !== 'undefined' ? window : undefined,
    className,
  } = props;

  // 控制回到顶部按钮出现时机
  const scroll = useScroll();
  const isVisible = useMemo(() => {
    if (!scroll) return false;
    return scroll.top > window.innerHeight;
  }, [scroll]);

  const onClick = () => {
    scroller?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      variant='outline'
      className={cn(
        'fixed bottom-4 right-4 z-20',
        'aspect-square p-2 rounded-full',
        !isVisible && 'hidden',
        className,
      )}
      onClick={onClick}
    >
      <ChevronUp />
    </Button>
  );
};

export default BackTop;