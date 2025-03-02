import Back from "./_components/Back";
import Gallery from "./_components/Gallery";
import Pagination from "./_components/Pagination";
import { getChapterPhotos } from "./_lib/api";

type Props = {
  params: {
    id: string;
    type?: number;
    chapterID?: string;
  };
};

const Page = async (props: Props) => {
  const { params } = props;
  const {
    id,
    type,
    chapterID,
  } = await Promise.resolve(params);

  // 获取图片列表
  const chapterPhotos = await getChapterPhotos({
    mangaID: id,
    type,
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