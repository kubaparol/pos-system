import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { CalendarIcon, Filter, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { SearchInput } from '@/components/base/search-input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn, formUrlQuery, removeKeysFromQuery } from '@/utils';

const SEARCH_QUERY_NAME = 'q';
const DATE_FROM_QUERY_NAME = 'dateFrom';
const DATE_TO_QUERY_NAME = 'dateTo';
const AMOUNT_MIN_QUERY_NAME = 'amountMin';
const AMOUNT_MAX_QUERY_NAME = 'amountMax';

export const OrdersFilters = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchParam = searchParams.get(SEARCH_QUERY_NAME);
  const dateFromParam = searchParams.get(DATE_FROM_QUERY_NAME);
  const dateToParam = searchParams.get(DATE_TO_QUERY_NAME);
  const amountMinParam = searchParams.get(AMOUNT_MIN_QUERY_NAME);
  const amountMaxParam = searchParams.get(AMOUNT_MAX_QUERY_NAME);

  const [searchValue, setSearchValue] = useState(searchParam || '');
  const dateFrom = dateFromParam ? new Date(dateFromParam) : undefined;
  const dateTo = dateToParam ? new Date(dateToParam) : undefined;
  const amountMin = amountMinParam || '';
  const amountMax = amountMaxParam || '';

  useEffect(() => {
    setSearchValue(searchParam || '');
  }, [searchParam]);

  const handleDateFromChange = useCallback(
    (date: Date | undefined) => {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: DATE_FROM_QUERY_NAME,
        value: date ? date.toISOString().split('T')[0] : '',
      });
      navigate(newUrl);
    },
    [navigate, searchParams],
  );

  const handleDateToChange = useCallback(
    (date: Date | undefined) => {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: DATE_TO_QUERY_NAME,
        value: date ? date.toISOString().split('T')[0] : '',
      });
      navigate(newUrl);
    },
    [navigate, searchParams],
  );

  const handleAmountMinChange = useCallback(
    (value: string) => {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: AMOUNT_MIN_QUERY_NAME,
        value,
      });
      navigate(newUrl);
    },
    [navigate, searchParams],
  );

  const handleAmountMaxChange = useCallback(
    (value: string) => {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: AMOUNT_MAX_QUERY_NAME,
        value,
      });
      navigate(newUrl);
    },
    [navigate, searchParams],
  );

  const clearFilters = useCallback(() => {
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: [
        SEARCH_QUERY_NAME,
        DATE_FROM_QUERY_NAME,
        DATE_TO_QUERY_NAME,
        AMOUNT_MIN_QUERY_NAME,
        AMOUNT_MAX_QUERY_NAME,
      ],
    });
    setSearchValue('');
    navigate(newUrl);
  }, [navigate, searchParams]);

  const hasActiveFilters = searchValue || dateFrom || dateTo || amountMin || amountMax;

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchInput
          query={SEARCH_QUERY_NAME}
          placeholder="Szukaj po nazwisku, imieniu lub numerze zamówienia..."
          value={searchValue}
          setValue={setSearchValue}
        />

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

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="space-y-1">
            <Label className="text-xs text-gray-500">Data od</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full sm:w-40 justify-start text-left font-normal',
                    !dateFrom && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, 'dd.MM.yyyy', { locale: pl }) : 'Wybierz datę'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={handleDateFromChange}
                  disabled={(date) => date > new Date() || (dateTo ? date > dateTo : false)}
                  locale={pl}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-1">
            <Label className="text-xs text-gray-500">Data do</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full sm:w-40 justify-start text-left font-normal',
                    !dateTo && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, 'dd.MM.yyyy', { locale: pl }) : 'Wybierz datę'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={handleDateToChange}
                  disabled={(date) => date > new Date() || (dateFrom ? date < dateFrom : false)}
                  locale={pl}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="space-y-1">
            <Label className="text-xs text-gray-500">Kwota od (PLN)</Label>
            <Input
              type="number"
              placeholder="0"
              value={amountMin}
              onChange={(e) => handleAmountMinChange(e.target.value)}
              className="w-full sm:w-32"
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs text-gray-500">Kwota do (PLN)</Label>
            <Input
              type="number"
              placeholder="10000"
              value={amountMax}
              onChange={(e) => handleAmountMaxChange(e.target.value)}
              className="w-full sm:w-32"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="flex items-end">
          <div className="flex items-center gap-2 text-sm text-gray-500 pb-2">
            <Filter className="h-4 w-4" />
            <span>{hasActiveFilters ? 'Filtry aktywne' : 'Brak filtrów'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
