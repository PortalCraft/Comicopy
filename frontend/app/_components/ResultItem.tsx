import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatNumber } from "@/lib/utils";
import { downloadAtom } from "@/stores/download";
import { useSetAtom } from "jotai";
import { Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SearchList } from "../_lib/api";

type Props = SearchList[number];

const ResultItem = (props: Props) => {
  const { id, title, cover, authors, popular } = props;

  const originCoverURL = cover.replace(".328x422.jpg", "");
  const mangaDetailsURL = `/manga/${id}/details`;
  const mangaReadURL = `/manga/${id}/read`;
  const getAuthorURL = (authorID: string) => `/author/${authorID}`;

  // 点击打开下载弹窗
  const setDownload = useSetAtom(downloadAtom);
  const onClickDownload = () => {
    setDownload({
      isOpen: true,
      activeId: id,
    });
  };

  return (
    <Card className="relative overflow-hidden transition hover:z-10 hover:scale-110">
      {/* 封面信息 */}
      <CardContent className="relative p-0 overflow-hidden">
        <Link href={mangaDetailsURL}>
          <Image src={originCoverURL} alt={title} width={350} height={500} />
        </Link>
        {/* 热度Badge */}
        <Link href="/popular">
          <Badge variant="secondary" className="absolute top-2 right-2 flex items-center gap-0.5">
            <Flame className="size-4" />
            {formatNumber(popular)}
          </Badge>
        </Link>
        {/* 底部信息 */}
        <div className="absolute bottom-0 w-full px-2 pt-8 pb-2 bg-gradient-to-t from-black to-transparent">
          <Link href={mangaDetailsURL}>
            <h2 className="text-white">
              {title}
            </h2>
          </Link>
          <div className="flex flex-wrap gap-x-2">
            {authors.map((author) => (
              <Link key={author.id} href={getAuthorURL(author.id)} className="text-sm text-zinc-200 hover:text-white">
                {author.name}
              </Link>
            ))}
          </div>
        </div>
      </CardContent>

      {/* 功能区 */}
      <CardFooter className="grid grid-cols-[1fr,1px,1fr] items-center p-0">
        <Link href={mangaReadURL}>
          <Button variant="ghost" className="w-full rounded-none">
            观看
          </Button>
        </Link>
        <Separator orientation="vertical" className="h-3/4" />
        <Button variant="ghost" className="rounded-none" onClick={onClickDownload}>
          下载
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultItem;