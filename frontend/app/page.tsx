'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Result from './components/Result'
import Search from './components/Search'
import Download from './components/Download'

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
