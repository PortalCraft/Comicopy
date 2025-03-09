import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';

const Page = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <SearchBar />
      <SearchResult />
      {/* <Download />
      <BackTop /> */}
    </div>
  )
};

export default Page;