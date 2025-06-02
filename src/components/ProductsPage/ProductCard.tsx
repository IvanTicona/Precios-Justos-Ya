import { motion } from 'framer-motion';
import { Button, Card } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types/Products';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/app/products/${product.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 h-full cursor-pointer">
        <div onClick={handleViewDetails}>
          <img 
            src={product.imageUrl}
            alt={product.name} 
            className="h-48 w-full object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="font-bold">Bs {product.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="p-4 pt-0">
          <Button 
            onClick={handleViewDetails}
            size="sm"
            className="w-full bg-slate-400 hover:bg-green-400"
          >
            Ver detalle
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};