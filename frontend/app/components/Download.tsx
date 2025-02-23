'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Card } from '@/components/ui/card'
// Dialog：下载弹窗
// Create：2025-02-22

// Type
type Props = {
  activeId: number
}
const Download = (props: Props) => {
  const { activeId } = props // 提取activeID（漫画唯一标识），用于访问对应漫画
  const [isOpen, setIsOpen] = useState<boolean>(false) // 弹窗是否显示
  console.log('activeId', activeId)
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen)
      }}>
      <DialogTitle></DialogTitle>
      <DialogContent className="sm:max-w-[425px] h-[500px] flex flex-col justify-between [&>button]:hidden ">
        {/* Tabs: 全部 or 番外 */}
        <Tabs
          defaultValue="all"
          className="flex-grow flex flex-col justify-center items-center">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="out">番外</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="w-full h-full">
            <Card className="w-full h-full flex justify-center items-center">
              yzj is waiting for you……
            </Card>
          </TabsContent>
          <TabsContent value="out" className="w-full h-full">
            <Card className="w-full h-full flex justify-center items-center">
              wht very love you……
            </Card>
          </TabsContent>
        </Tabs>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <Checkbox />
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              全选
            </label>
          </div>
          <Button type="submit" variant="ghost">
            下载
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Download
