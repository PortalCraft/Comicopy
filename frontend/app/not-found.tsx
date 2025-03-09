import { Button } from '@/app/components/ui/button';
import Link from 'next/link';

/** 404页，参考：https://www.miyoushe.com/sr/404 */
const Page = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-1.5 h-screen'>
      <h1 className='text-6xl font-semibold sm:text-8xl'>ERROR</h1>
      <p className='text-zinc-500 transition dark:text-zinc-400'>您的页面好像偏离了地球...</p>
      <Link href='/' className='rounded-xl px-8 mt-2'>
        <Button>回到主页</Button>
      </Link>
    </div>
  );
};

export default Page;