import { useState, useEffect } from 'react';
import { Button } from '@heroui/react';
import type { CartItem, Product } from '../types/Products';
import { CategoryFilter } from '../components/ProductsPage/CategoryFilter';
import { fetchProducts } from '../service/productService';
import { ProductList } from '../components/ProductsPage/ProductList';
import { MobileFilters } from '../components/ProductsPage/MobileFilters';
import { CartDrawer } from '../components/ProductsPage/CardDrawer';

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Error al cargar los productos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (index: number) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const categories = ['Todos', ...new Set(products.map(p => p.category))];
  const filteredProducts = products.filter(p => 
    activeCategory === 'Todos' || p.category === activeCategory
  );

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-amber-100">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {activeCategory === 'Todos' ? 'Menú completo' : activeCategory}
          </h2>
          <Button
            className="lg:hidden"
            onClick={() => setIsFilterOpen(true)}
          >
            Filtros
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block">
            <CategoryFilter 
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </div>

          <div className="lg:col-span-3">
            <ProductList 
              products={filteredProducts} 
              onAddToCart={addToCart} 
            />
          </div>
        </div>
      </main>

      <MobileFilters
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        total={total}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
};