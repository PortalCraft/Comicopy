import { sleep } from "@/lib/utils";
import Back from "./_components/Back";
import Gallery from "./_components/Gallery";
import Pagination from "./_components/Pagination";
import { getChapterPhotos, getMangaInfo } from "./_lib/api";

type Props = {
  params: {
    id: string;
    type?: number;
    chapterID?: string;
  };
};

const Page = async (props: Props) => {
  const { params } = props;
  const { id } = await Promise.resolve(params);

  // 获取漫画详情
  const mangaInfo = await getMangaInfo({ id });
  const chapterID = mangaInfo.chapters[0].id;

  // TODO: 解决连续发送两个请求的read:ECONNRESET错误
  await sleep(0);

  // 获取章节图片
  const chapterPhotos = await getChapterPhotos({
    mangaID: id,
    chapterID,
  });

  return (
    <div className="flex items-start gap-4 px-4 min-h-screen">
      <Back />
      <Gallery photos={chapterPhotos} />
      <Pagination total={chapterPhotos.length} />
    </div>
  );
};

export default Page;