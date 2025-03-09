'use client';

import { Button } from '@/app/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Back = () => {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };

  return (
    <Button
      variant='outline'
      className='sticky top-2 mt-2 p-2 text-zinc-400 rounded-full hover:text-black'
      onClick={onClick}
    >
      <ChevronLeft className='!size-6' />
    </Button>
  );
};

export default Back;