'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import Download from './components/Download'
import Search from './components/Search'

// 确保只在客户端运行，防止报错“window is not defined”
const Result = dynamic(() => import("./components/Result"), { ssr: false });

const Page = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-end pt-4 px-4">
        <Link href="https://github.com/PortalCraft/Comicopy" target="_blank">
          <Image src="/images/github.svg" alt="Github" width={30} height={30} />
        </Link>
      </div>
      <Search />
      <Result />
      <Download />
    </div>
  )
}

export default Page
