import { AnimatePresence } from 'framer-motion';
import { ProductCard } from './ProductCard';
import type { Product } from '../../types/Products';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductList = ({ products,}: ProductListProps) => (
  <AnimatePresence>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
        />
      ))}
    </div>
  </AnimatePresence>
);