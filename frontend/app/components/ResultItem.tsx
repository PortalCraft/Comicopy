import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardFooter } from '@/app/components/ui/card';
import { Separator } from '@/app/components/ui/separator';
import { formatNumber } from '@/app/lib/utils';
import { downloadAtom } from '@/app/stores/download';
import { useSetAtom } from 'jotai';
import { Flame } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SearchListResponse } from '../lib/api';

type Props = SearchListResponse['data']['list'][number];

const ResultItem = (props: Props) => {
  const {
    path_word,
    name,
    cover,
    author: authors,
    popular,
  } = props;

  const originCoverURL = cover.replace('.328x422.jpg', '');
  const mangaDetailsURL = `/manga/${path_word}/details`;
  const mangaReadURL = `/manga/${path_word}/read`;
  const getAuthorURL = (authorID: string) => `/author/${authorID}`;

  // 点击打开下载弹窗
  const setDownload = useSetAtom(downloadAtom);
  const onClickDownload = () => {
    setDownload({
      isOpen: true,
      activeId: path_word,
    });
  };

  return (
    <Card className='group flex flex-col overflow-hidden'>
      {/* 封面信息 */}
      <CardContent className='relative flex-1 p-0 overflow-hidden'>
        <Link href={mangaDetailsURL} className='flex h-full'>
          <Image
            src={originCoverURL}
            alt={name}
            width={350}
            height={500}
            loading='lazy'
            className='size-full object-cover transition group-hover:scale-110'
          />
        </Link>
        {/* 热度Badge */}
        <Link href='/popular'>
          <Badge variant='secondary' className='absolute top-2 right-2 flex items-center gap-0.5'>
            <Flame className='size-4' />
            {formatNumber(popular)}
          </Badge>
        </Link>
        {/* 底部信息 */}
        <div className='absolute bottom-0 w-full px-2 pt-8 pb-2 bg-gradient-to-t from-black to-transparent pointer-events-none transition-all group-hover:pt-12 group-hover:pb-4'>
          <h2 className='text-white'>
            {name}
          </h2>
          <div className='flex flex-wrap gap-x-2 pointer-events-auto'>
            {authors.map((author) => (
              <Link
                key={author.path_word}
                href={getAuthorURL(author.path_word)}
                className='text-sm text-zinc-200 hover:text-white'
              >
                {author.name}
              </Link>
            ))}
          </div>
        </div>
      </CardContent>

      {/* 功能区 */}
      <CardFooter className='grid grid-cols-[1fr,1px,1fr] items-center p-0'>
        <Link href={mangaReadURL}>
          <Button variant='ghost' className='w-full rounded-none'>
            观看
          </Button>
        </Link>
        <Separator orientation='vertical' className='h-3/4' />
        <Button variant='ghost' className='rounded-none' onClick={onClickDownload}>
          下载
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultItem;