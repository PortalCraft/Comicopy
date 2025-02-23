'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Download from './components/Download'
import Search from './components/Search'

// 确保只在客户端运行，防止报错“window is not defined”
const Result = dynamic(() => import("./components/Result"), { ssr: false });

const Page = () => {
  const [keywords, setKeywords] = useState('')
  const [activeId] = useState(0) // 下载漫画的ID（预留）

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-end pt-4 px-4">
        <Link href="https://github.com/PortalCraft/Comicopy" target="_blank">
          <Image src="/images/github.svg" alt="Github" width={30} height={30} />
        </Link>
      </div>
      <Search onSearch={setKeywords} />
      <Result keywords={keywords} />
      <Download activeId={activeId} />
    </div>
  )
}

export default Page
