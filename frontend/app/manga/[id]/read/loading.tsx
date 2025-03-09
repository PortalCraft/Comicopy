import { Skeleton } from '@/app/components/ui/skeleton';

const Page = () => {
  return (
    <div className='flex items-start gap-4 px-4'>
      <Skeleton className='mt-4 w-10 h-9 rounded-full' />
      <Skeleton className='flex-1 h-screen rounded-none' />
      <Skeleton className='w-24 h-9 mt-4' />
    </div>
  );
};

export default Page;