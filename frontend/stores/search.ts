import { atom } from "jotai";

export const searchAtom = atom({
  isSearching: false,
  keywords: "",
});