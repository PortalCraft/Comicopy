import { atom } from 'jotai';

export const searchAtom = atom({
  canSearch: false,
  keywords: '',
});