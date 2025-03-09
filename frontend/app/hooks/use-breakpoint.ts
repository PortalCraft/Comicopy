import { useEffect, useState } from 'react';

// https://tailwindcss.com/docs/responsive-design#overview
export enum BREAKPOINTS {
  sm = 640,
  md = 768,
  lg = 1024,
  xl = 1280,
  '2xl' = 1536,
};

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<BREAKPOINTS>();

  useEffect(() => {
    const getBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= BREAKPOINTS['2xl']) return BREAKPOINTS['2xl'];
      if (width >= BREAKPOINTS.xl) return BREAKPOINTS.xl;
      if (width >= BREAKPOINTS.lg) return BREAKPOINTS.lg;
      if (width >= BREAKPOINTS.md) return BREAKPOINTS.md;
      return BREAKPOINTS.sm;
    };

    const onResize = () => {
      setBreakpoint(getBreakpoint());
    };

    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);

  return breakpoint;
};