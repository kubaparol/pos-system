import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { formUrlQuery, removeKeysFromQuery } from '@/utils';

import { Input } from '../ui/input';

export interface SearchInputProps {
  query: string;
  placeholder?: string;
  value?: string;
  setValue?: (value: string) => void;
}

const MAX_SEARCH_LENGTH = 80;

export const SearchInput = ({
  query,
  placeholder = 'Szukaj...',
  value: externalValue,
  setValue: externalSetValue,
}: SearchInputProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [internalValue, setInternalValue] = useState(searchParams.get(query) || '');

  const value = externalValue !== undefined ? externalValue : internalValue;
  const setValue = externalSetValue || setInternalValue;

  useEffect(() => {
    if (externalValue === undefined) {
      const urlValue = searchParams.get(query) || '';
      if (urlValue !== internalValue) {
        setInternalValue(urlValue);
      }
    }
  }, [searchParams, query, externalValue, internalValue]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = '';

      if (value) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: query,
          value: value,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: [query],
        });
      }

      navigate(newUrl);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [value, navigate, searchParams, query]);

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        maxLength={MAX_SEARCH_LENGTH}
        className="pl-10"
      />
    </div>
  );
};
