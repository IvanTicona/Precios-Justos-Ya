import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '../types/Products';
import { fetchProductById } from '../service/productService';
import { Button } from '@heroui/react';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product?.name} to cart`);
    navigate('/');
  };

  if (loading) return <div className="p-4">Cargando producto...</div>;
  if (!product) return <div className="p-4">Producto no encontrado</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/app/productos')}
        className="mb-4"
      >
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-auto rounded-lg object-cover max-h-96"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          
          <div className="mb-6">
            <span className="text-2xl font-bold">Bs {product.price.toFixed(2)}</span>
            {product.stock && (
              <span className="ml-2 text-sm text-gray-500">
                ({product.stock} disponibles)
              </span>
            )}
          </div>

          <div className="flex items-center mb-6">
            <Button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="mx-4 text-lg">{quantity}</span>
            <Button 
              onClick={() => setQuantity(q => q + 1)}
              disabled={product.stock ? quantity >= product.stock : false}
            >
              +
            </Button>
          </div>

          <Button
            onClick={handleAddToCart}
            className="w-full bg-green-500 hover:bg-indigo-700 py-3"
          >
            Agregar al carrito
          </Button>

          {product.category && (
            <div className="mt-4">
              <span className="text-sm text-gray-500">Categoría: </span>
              <span className="text-sm font-medium">{product.category}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};