import Back from "./_components/Back";
import Gallery from "./_components/Gallery";
import Pagination from "./_components/Pagination";

type Props = {
  params: { id: string };
};

const Page = async (props: Props) => {
  const { params } = props;
  const { id } = await Promise.resolve(params);
  console.log(id)

  return (
    <div className="flex items-start gap-4 px-4 min-h-screen">
      <Back />
      <Gallery />
      <Pagination />
    </div>
  );
};

export default Page;