import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { ProductCreateDtoSchema } from '@/api/api.contracts';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';

import { useCategoriesQuery } from '../../api/categories.query';
import type { ProductCreateDto } from '../../api/types';

interface ProductAddDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFormSubmit: (values: ProductCreateDto) => Promise<void>;
}

export const ProductAddDialog = ({ open, onOpenChange, onFormSubmit }: ProductAddDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: categoriesData, isLoading: categoriesLoading } = useCategoriesQuery();

  const form = useForm<ProductCreateDto>({
    resolver: zodResolver(ProductCreateDtoSchema),
    defaultValues: {
      title: '',
      category: '',
      description: '',
      imageUrl: undefined,
      price: 0,
      stockQuantity: 0,
      isArchived: false,
    },
  });

  const onSubmit = async (values: ProductCreateDto) => {
    setIsLoading(true);
    await onFormSubmit(values);
    setIsLoading(false);
    form.reset();
    onOpenChange(false);
  };

  const handleOpenChange = (open: boolean) => {
    form.reset();
    form.clearErrors();
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Dodaj nowy produkt</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa</FormLabel>
                  <FormControl>
                    <Input placeholder="Nazwa produktu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategoria</FormLabel>
                  <FormControl>
                    {categoriesLoading ? (
                      <Skeleton className="h-10 w-full" />
                    ) : (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz kategorię" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoriesData?.data.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cena (zł)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      step="0.01"
                      placeholder="1.00"
                      value={field.value || ''}
                      onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 1)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stockQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ilość w magazynie</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      value={field.value || ''}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL zdjęcia</FormLabel>
                  <FormControl>
                    <Input disabled placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    URL zdjęcia nie może być edytowany
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opis</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Opis produktu" rows={10} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
                disabled={isLoading}
              >
                Anuluj
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Dodawanie...
                  </>
                ) : (
                  'Dodaj'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
