"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { searchAtom } from "@/stores/search";
import { useFocusWithin } from "ahooks";
import { useSetAtom } from "jotai";
import { SearchIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

const Search = () => {
  const [value, setValue] = useState("");
  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // 组件挂载后聚焦
  const inputRef = useRef<HTMLInputElement>(null);
  const isFocus = useFocusWithin(inputRef);
  useEffect(() => {
    const { current: input } = inputRef;
    if (!input) return;
    input.focus();
  }, []);

  // 提交搜索状态
  const setSearch = useSetAtom(searchAtom);
  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch({
      isSearching: true,
      keywords: value,
    });
  };

  return (
    <div
      className="flex flex-col justify-center gap-3 sm:w-1/2 mt-32 mx-auto px-4"
    >
      <h1 className="text-2xl text-center">L O G O</h1>
      <form
        className="relative"
        onSubmit={onSubmitForm}
      >
        <Input
          ref={inputRef}
          value={value}
          className={cn("mx-auto rounded-full transition-all", !isFocus && "w-1/2")}
          onChange={onChangeValue}
        />
        <SearchIcon className={cn("absolute top-0 bottom-0 right-3 size-4 my-auto transition-all", !isFocus && "invisible opacity-0 -translate-x-64")} />
      </form>
    </div>
  );
};

export default Search;