import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { SearchInput } from '@/components/base/search-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

import { formUrlQuery } from '@/utils';

import { useCategoriesQuery } from '../../api/categories.query';

const SEARCH_QUERY_NAME = 'q';
const CATEGORY_QUERY_NAME = 'category';

export const ProductFilters = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: categoriesData, isLoading: categoriesLoading } = useCategoriesQuery();

  const categoryQuery = searchParams.get(CATEGORY_QUERY_NAME) || '';

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

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchInput query={SEARCH_QUERY_NAME} />

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
      </div>
    </div>
  );
};
