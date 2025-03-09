import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <div className='flex items-start justify-end pt-4 px-4'>
      <Link href='https://github.com/PortalCraft/Comicopy' target='_blank'>
        <Image src='/images/github.svg' alt='Github' width={30} height={30} />
      </Link>
    </div>
  );
};

export default Header;