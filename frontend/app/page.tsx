'use client'

import { useScroll } from 'ahooks'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import Download from './_components/Download'
import Search from './_components/Search'

// 确保只在客户端运行，防止报错“window is not defined”
const Result = dynamic(() => import("./_components/Result"), { ssr: false });
const BackTop = dynamic(() => import("./_components/BackTop"), { ssr: false });

const Page = () => {
  // 控制回到顶部按钮出现时机
  const scroll = useScroll();
  const isBackTopVisible = useMemo(() => {
    if (!scroll) return false;
    return scroll.top > window.innerHeight;
  }, [scroll]);

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
      <BackTop isVisible={isBackTopVisible} className="fixed bottom-4 right-4 z-20" />
    </div>
  )
}

export default Page
