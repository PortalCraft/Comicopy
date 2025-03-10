'use client'

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { downloadAtom } from '@/app/stores/download';
import { useAtom } from 'jotai';
// Dialog：下载弹窗
// Create：2025-02-22

const Download = () => {
  const [download, setDownload] = useAtom(downloadAtom)
  const { activeId, isOpen } = download

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setDownload({ ...download, isOpen: !isOpen })
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
