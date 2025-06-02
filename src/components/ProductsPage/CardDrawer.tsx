import { Drawer, Button } from '@heroui/react';
import type { CartItem as CartItemType } from '../../types/Products';
import { CartItems } from './CardItem';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItemType[];
  total: number;
  onRemoveItem: (index: number) => void;
}

export const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cart, 
  total, 
  onRemoveItem 
}: CartDrawerProps) => (
  <Drawer
    isOpen={isOpen}
    onClose={onClose}
    title="Tu pedido"
    size="md"
  >
    <div className="divide-y divide-gray-200">
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium">Carrito vacío</h3>
          <p className="mt-1 text-sm text-gray-500">Agrega productos para continuar</p>
        </div>
      ) : (
        <>
          <div className="max-h-[60vh] overflow-y-auto p-4">
            {cart.map((item, index) => (
              <CartItems 
                key={index}
                item={item}
                onRemove={() => onRemoveItem(index)}
              />
            ))}
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button
              className="mt-4 w-full"
              onClick={() => alert('Pedido confirmado!')}
            >
              Confirmar pedido
            </Button>
          </div>
        </>
      )}
    </div>
  </Drawer>
);