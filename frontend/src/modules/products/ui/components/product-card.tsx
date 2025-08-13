import { Archive, Edit, Minus, Plus, RotateCcw, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

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

import { useCartStore } from '@/modules/orders/store/use-cart-store';
import { cn, formatCurrency, handleError } from '@/utils';

import { useArchiveProductMutation } from '../../api/archive.mutation';
import { useEditProductMutation } from '../../api/edit.mutation';
import { useRestoreProductMutation } from '../../api/restore.mutation';
import type { ProductEditDto, ProductResponseData } from '../../api/types';
import { ProductEditDialog } from './product-edit-dialog';

interface ProductCardProps {
  product: ProductResponseData;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, removeArchivedItems } = useCartStore();
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { mutateAsync: editProduct } = useEditProductMutation();
  const { mutateAsync: archiveProduct } = useArchiveProductMutation();
  const { mutateAsync: restoreProduct } = useRestoreProductMutation();

  const rating = Number.parseFloat(product.reviewRating || '0');
  const formattedPrice = formatCurrency(Number(product.price));

  const getStockStatus = () => {
    if (product.isArchived) {
      return { text: 'Tymczasowo niedostępny', color: 'bg-gray-500', urgent: false };
    }

    if (product.stockQuantity === 0) {
      return { text: 'Brak w magazynie', color: 'bg-red-500', urgent: true };
    }

    if (product.stockQuantity === 1) {
      return { text: 'Ostatnia sztuka!', color: 'bg-red-500', urgent: true };
    }

    if (product.stockQuantity <= 3) {
      return {
        text: `Kończy się (${product.stockQuantity} szt.)`,
        color: 'bg-amber-500',
        urgent: true,
      };
    }

    return {
      text: `Dostępny (${product.stockQuantity} szt.)`,
      color: 'bg-green-500',
      urgent: false,
    };
  };

  const stockStatus = getStockStatus();
  const isPopular = rating >= 4.5 && (product.reviewCount || 0) >= 10;
  const canAddToCart = !product.isArchived && product.stockQuantity > 0;

  const handleAddToCart = async () => {
    if (!canAddToCart) return;
    setIsLoading(true);
    try {
      const wasAdded = addItem(
        {
          id: product.id,
          title: product.title,
          price: product.price,
          stockQuantity: product.stockQuantity,
          imageUrl: product.imageUrl,
        },
        quantity,
      );

      if (wasAdded) {
        toast.success(`Dodano ${quantity} szt. do zamówienia`);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const adjustQuantity = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(product.stockQuantity, quantity + delta));
    setQuantity(newQuantity);
  };

  const handleArchiveToggle = async () => {
    setIsLoading(true);

    try {
      if (product.isArchived) {
        await restoreProduct(product.id);
        toast.success('Produkt został przywrócony');
      } else {
        await archiveProduct(product.id);
        removeArchivedItems([product.id]);
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
      <Card
        className={cn(
          'w-full mx-auto transition-all duration-200 hover:shadow-lg py-0',
          product.isArchived && 'opacity-75 bg-muted/50',
        )}
      >
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="secondary" className="text-xs font-medium">
              {product.category}
            </Badge>
            {isPopular && (
              <Badge className="bg-amber-100 text-amber-800 text-xs">⭐ Popularne</Badge>
            )}
          </div>

          <div className="relative mb-4">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-48 object-contain rounded-lg bg-muted"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-48 flex items-center justify-center text-gray-400 bg-muted rounded-lg">
                <ShoppingCart className="w-16 h-16" />
              </div>
            )}
            {stockStatus.urgent && (
              <div className="absolute top-2 right-2">
                <span
                  className={cn(
                    'inline-flex items-center justify-center rounded-md border-transparent px-2 py-0.5 text-xs font-bold text-white',
                    stockStatus.color,
                  )}
                >
                  {stockStatus.urgent && product.stockQuantity === 0
                    ? 'BRAK'
                    : product.stockQuantity <= 1
                      ? 'OSTATNIA SZTUKA'
                      : 'KOŃCZY SIĘ'}
                </span>
              </div>
            )}
          </div>

          <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2">{product.title}</h3>

          {(product.reviewCount || 0) > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-medium text-sm ml-1">{rating.toFixed(1)}</span>
              </div>
              <span className="text-muted-foreground text-sm">({product.reviewCount} opinii)</span>
            </div>
          )}

          <div className="mb-4">
            <div className="text-2xl font-bold text-primary">{formattedPrice}</div>
          </div>

          <div className="mt-auto">
            <div className="mb-4">
              <span
                className={cn(
                  'inline-flex items-center justify-center rounded-md border-transparent px-2 py-0.5 text-xs font-medium text-white',
                  stockStatus.color,
                )}
              >
                {stockStatus.text}
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={cn('text-sm font-medium', !canAddToCart && 'text-muted-foreground')}
                >
                  Ilość:
                </span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => adjustQuantity(-1)}
                    disabled={quantity <= 1 || !canAddToCart}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span
                    className={cn(
                      'px-3 py-1 text-sm font-medium min-w-[2rem] text-center',
                      !canAddToCart && 'text-muted-foreground',
                    )}
                  >
                    {canAddToCart ? quantity : 0}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => adjustQuantity(1)}
                    disabled={quantity >= product.stockQuantity || !canAddToCart}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={isLoading || !canAddToCart}
                className="w-full"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isLoading ? 'Dodawanie...' : 'Dodaj do koszyka'}
              </Button>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowEditDialog(true)}
              className="w-full"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edytuj
            </Button>

            <div className="mt-2">
              {product.isArchived ? (
                <Button
                  variant="outline"
                  onClick={() => setShowArchiveDialog(true)}
                  className="w-full text-green-600 border-green-200 hover:bg-green-50"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Przywróć
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setShowArchiveDialog(true)}
                  className="w-full hover:text-destructive hover:border-destructive"
                >
                  <Archive className="w-4 h-4 mr-2" />
                  Archiwizuj
                </Button>
              )}
            </div>
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
