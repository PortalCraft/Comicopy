import { atom } from "jotai";

export const downloadAtom = atom({
  isOpen: false,
  activeId: "",
});