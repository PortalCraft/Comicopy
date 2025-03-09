'use client'

import { Input } from '@/app/components/ui/input';
import { cn } from '@/app/lib/utils';
import { searchAtom } from '@/app/stores/search';
import { useSetAtom } from 'jotai';
import { SearchIcon } from 'lucide-react';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useToggle } from 'react-use';

const SearchBar = () => {
  const [value, setValue] = useState('');
  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // 组件挂载后聚焦
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocus, toggleFocus] = useToggle(false);
  useEffect(() => {
    const { current: input } = inputRef;
    if (!input) return;
    input.focus();
  }, []);

  // 提交搜索
  const setSearch = useSetAtom(searchAtom);
  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch({
      canSearch: true,
      keywords: value,
    });
  };

  return (
    <div className='flex flex-col justify-center gap-3 sm:w-1/2 px-4 mt-56 mx-auto'>
      <h1 className='text-2xl text-center'>L O G O</h1>
      <form
        className='relative'
        onSubmit={onSubmitForm}
      >
        <Input
          ref={inputRef}
          value={value}
          className={cn('mx-auto rounded-full transition-all', !isFocus && 'w-1/2')}
          onChange={onChangeValue}
          onFocus={toggleFocus}
          onBlur={toggleFocus}
        />
        <SearchIcon
          className={cn(
            'absolute top-0 bottom-0 right-3 size-4 my-auto transition-all',
            !isFocus && 'invisible opacity-0 -translate-x-64'
          )}
        />
      </form>
    </div>
  );
};

export default SearchBar;