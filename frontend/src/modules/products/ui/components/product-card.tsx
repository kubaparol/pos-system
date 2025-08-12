import { Archive, ArchiveRestore, Edit, MoreVertical, Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { StockIndicator } from '@/components/base/stock-indicator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { handleError } from '@/utils';

import { useArchiveProductMutation } from '../../api/archive.mutation';
import { useEditProductMutation } from '../../api/edit.mutation';
import { useRestoreProductMutation } from '../../api/restore.mutation';
import type { ProductEditDto, ProductResponseData } from '../../api/types';
import { ProductEditDialog } from './product-edit-dialog';

interface ProductCardProps {
  product: ProductResponseData;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: editProduct } = useEditProductMutation();
  const { mutateAsync: archiveProduct } = useArchiveProductMutation();
  const { mutateAsync: restoreProduct } = useRestoreProductMutation();

  const isOutOfStock = product.stockQuantity === 0;
  const canAddToCart = !isOutOfStock && !product.isArchived;

  const handleAddToCart = () => {
    if (!canAddToCart) return;

    toast.success(`${product.title} został dodany do koszyka`);
  };

  const handleArchiveToggle = async () => {
    setIsLoading(true);

    try {
      if (product.isArchived) {
        await restoreProduct(product.id);
        toast.success('Produkt został przywrócony');
      } else {
        await archiveProduct(product.id);
        toast.success('Produkt został zarchiwizowany');
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
      setShowArchiveDialog(false);
    }
  };

  const handleProductUpdate = async (values: ProductEditDto) => {
    try {
      await editProduct({ productId: product.id, productEditDto: values });
      toast.success('Produkt został zaktualizowany');
      setShowEditDialog(false);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <Card className="group h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-200 py-0">
        <div className="relative">
          <div className="aspect-square relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.title}
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <ShoppingCart className="w-16 h-16" />
              </div>
            )}
          </div>

          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isOutOfStock && (
              <Badge variant="destructive" className="text-xs font-medium">
                Brak
              </Badge>
            )}
            {product.isArchived && (
              <Badge variant="secondary" className="text-xs font-medium">
                Archiwum
              </Badge>
            )}
          </div>

          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edytuj
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowArchiveDialog(true)}>
                  {product.isArchived ? (
                    <>
                      <ArchiveRestore className="mr-2 h-4 w-4" />
                      Przywróć
                    </>
                  ) : (
                    <>
                      <Archive className="mr-2 h-4 w-4" />
                      Archiwizuj
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex-1 space-y-3">
            <h3 className="font-semibold text-sm leading-tight line-clamp-2 min-h-[2.5rem]">
              {product.title}
            </h3>

            <div className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xl font-bold text-green-600">
                  {Number(product.price).toFixed(2)}{' '}
                  <span className="text-sm font-normal">PLN</span>
                </p>
              </div>
            </div>

            <StockIndicator stockQuantity={product.stockQuantity} />
          </div>

          <div className="mt-4">
            {canAddToCart ? (
              <Button
                onClick={handleAddToCart}
                className="w-full h-10 text-sm font-medium"
                size="sm"
              >
                <Plus className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Dodaj do koszyka</span>
                <span className="sm:hidden">Dodaj</span>
              </Button>
            ) : (
              <Button
                disabled
                className="w-full h-10 text-sm font-medium"
                size="sm"
                variant="secondary"
              >
                {isOutOfStock ? 'Brak w magazynie' : 'Niedostępny'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showArchiveDialog} onOpenChange={setShowArchiveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {product.isArchived ? 'Przywróć produkt' : 'Archiwizuj produkt'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {product.isArchived
                ? `Czy na pewno chcesz przywrócić produkt "${product.title}"?`
                : `Czy na pewno chcesz zarchiwizować produkt "${product.title}"? Zostanie usunięty z katalogu sprzedaży.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction onClick={handleArchiveToggle} disabled={isLoading}>
              {isLoading ? 'Przetwarzanie...' : product.isArchived ? 'Przywróć' : 'Archiwizuj'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ProductEditDialog
        product={product}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onFormSubmit={handleProductUpdate}
      />
    </>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <Card className="h-full">
      <div className="p-4 space-y-3">
        <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
        </div>
      </div>
    </Card>
  );
};
