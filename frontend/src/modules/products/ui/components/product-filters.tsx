import { X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { SearchInput } from '@/components/base/search-input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

import { formUrlQuery, removeKeysFromQuery } from '@/utils';

import { useCategoriesQuery } from '../../api/categories.query';

const SEARCH_QUERY_NAME = 'q';
const CATEGORY_QUERY_NAME = 'category';
const SORT_QUERY_NAME = 'sort';

const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Nazwa A-Z' },
  { value: 'name-desc', label: 'Nazwa Z-A' },
  { value: 'price-asc', label: 'Cena rosnąco' },
  { value: 'price-desc', label: 'Cena malejąco' },
  { value: 'stock-asc', label: 'Dostępność rosnąco' },
  { value: 'stock-desc', label: 'Dostępność malejąco' },
  { value: 'category-asc', label: 'Kategoria A-Z' },
  { value: 'category-desc', label: 'Kategoria Z-A' },
];

export const ProductFilters = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: categoriesData, isLoading: categoriesLoading } = useCategoriesQuery();

  const searchParam = searchParams.get(SEARCH_QUERY_NAME);
  const categoryQuery = searchParams.get(CATEGORY_QUERY_NAME) || '';
  const sortQuery = searchParams.get(SORT_QUERY_NAME) || '';

  const [searchValue, setSearchValue] = useState(searchParam || '');

  useEffect(() => {
    setSearchValue(searchParam || '');
  }, [searchParam]);

  const handleCategoryChange = useCallback(
    (value: string) => {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: CATEGORY_QUERY_NAME,
        value,
      });

      navigate(newUrl);
    },
    [navigate, searchParams],
  );

  const handleSortChange = useCallback(
    (value: string) => {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: SORT_QUERY_NAME,
        value,
      });

      navigate(newUrl);
    },
    [navigate, searchParams],
  );

  const clearFilters = useCallback(() => {
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: [SEARCH_QUERY_NAME, CATEGORY_QUERY_NAME, SORT_QUERY_NAME],
    });
    setSearchValue('');
    navigate(newUrl);
  }, [navigate, searchParams]);

  const hasActiveFilters = searchValue || (categoryQuery && categoryQuery !== 'all') || sortQuery;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchInput
          query={SEARCH_QUERY_NAME}
          placeholder="Szukaj produktów..."
          value={searchValue}
          setValue={setSearchValue}
        />

        {categoriesLoading ? (
          <Skeleton className="h-10 w-full sm:w-48" />
        ) : (
          <Select value={categoryQuery} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Wszystkie kategorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie kategorie</SelectItem>
              {categoriesData?.data.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Select value={sortQuery} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sortuj według" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={clearFilters}
            size="icon"
            className="shrink-0 bg-transparent"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
