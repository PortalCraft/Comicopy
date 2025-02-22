import Header from "./Banner/Header";
import Search from "./Banner/Search";
import Title from "./Banner/Title";

const Banner = () => {
  return (
    <div className="relative">
      <Header />
      <Title />
      <Search />
    </div>
  );
};

export default Banner;