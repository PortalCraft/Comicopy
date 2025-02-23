import { atom } from "jotai";

export const downloadAtom = atom({
  // 弹窗是否显示
  isOpen: false,
  // 下载漫画的ID
  activeId: "",
});