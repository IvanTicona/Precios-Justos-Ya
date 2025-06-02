import { Button } from '@heroui/react';
import type { CartItem } from '../../types/Products';

interface CartItemProps {
  item: CartItem;
  onRemove: () => void;
}

export const CartItems = ({ item, }: CartItemProps) => (
  <div className="flex py-4">
    <img src={item.image} alt={item.name} className="h-16 w-16 rounded-md object-cover" />
    <div className="ml-4 flex-1">
      <h3 className="font-medium">{item.name}</h3>
      <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
    </div>
    <Button
      variant="ghost"
      className="text-red-600 hover:bg-red-50"
      size="sm"
    >
      Eliminar
    </Button>
  </div>
);