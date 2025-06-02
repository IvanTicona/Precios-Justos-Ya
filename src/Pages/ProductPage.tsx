import { useState } from 'react';

function ProductPage() {
  // Estado para los productos y el carrito
  const [products, setProducts] = useState([
    { id: 1, name: 'Hamburguesa Clásica', price: 8.99, description: 'Carne, lechuga, tomate y salsa especial', category: 'Hamburguesas', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80' },
    { id: 2, name: 'Pizza Margarita', price: 12.50, description: 'Mozzarella, tomate y albahaca fresca', category: 'Pizzas', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80' },
    { id: 3, name: 'Ensalada César', price: 7.25, description: 'Lechuga romana, croutons, parmesano y aderezo césar', category: 'Ensaladas', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80' },
    { id: 4, name: 'Pasta Carbonara', price: 10.75, description: 'Pasta con salsa de huevo, queso, panceta y pimienta', category: 'Pastas', image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80' },
    { id: 5, name: 'Refresco', price: 2.50, description: 'Bebida gaseosa 500ml', category: 'Bebidas', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80' },
    { id: 6, name: 'Helado de Vainilla', price: 4.00, description: 'Postre helado de vainilla con toppings', category: 'Postres', image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80' },
  ]);

  const [cart, setCart] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = ['Todos', ...new Set(products.map(product => product.category))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
  }

  interface CartItem extends Product {}

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  interface RemoveFromCartFn {
    (index: number): void;
  }

  const removeFromCart: RemoveFromCartFn = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-red-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-white text-xl font-bold">Pedidos<span className="text-indigo-200">Ya</span></h1>
            </div>
            
            {/* Search bar */}
            <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="w-full max-w-lg lg:max-w-xs">
                <label htmlFor="search" className="sr-only">Buscar</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    {/* <MagnifyingGlassIcon className="h-5 w-5 text-indigo-200" aria-hidden="true" /> */}
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full rounded-md border-0 bg-red-500 py-1.5 pl-10 pr-3 text-white placeholder:text-indigo-200 focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    placeholder="Buscar productos..."
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            {/* Cart button */}
            <div className="ml-4 flow-root lg:ml-6">
              <button 
                type="button" 
                className="group -m-2 flex items-center p-2"
                onClick={() => {
                  const sidebar = document.getElementById('cart-sidebar');
                  if (sidebar) {
                    sidebar.classList.toggle('translate-x-full');
                  }
                }}
              >
                {/* <ShoppingCartIcon
                  className="h-6 w-6 flex-shrink-0 text-white group-hover:text-indigo-200"
                  aria-hidden="true"
                /> */}
                <span className="ml-2 text-sm font-medium text-white">{cart.length}</span>
                <span className="sr-only">items in cart, view bag</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile filter dialog */}
        <div className="lg:hidden">
          <button
            type="button"
            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 mt-4"
            onClick={() => setMobileFiltersOpen(true)}
          >
            {/* <FunnelIcon className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" /> */}
            Filtros
          </button>
        </div>

        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {activeCategory === 'Todos' ? 'Todos los productos' : activeCategory}
          </h1>
        </div>

        <section className="pb-24 pt-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <div className="hidden lg:block">
              <div className="sticky top-6">
                <h2 className="font-medium text-gray-900">Categorías</h2>
                <div className="mt-4 space-y-4">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <button
                        onClick={() => setActiveCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-md ${activeCategory === category ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        {category}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden">
                    <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none h-48">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        <a href="#">
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
                        <button
                          onClick={() => addToCart(product)}
                          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile filters */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileFiltersOpen(false)} />
          <div className="fixed inset-0 z-40 flex">
            <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                </button>
              </div>

              {/* Filters */}
              <div className="mt-4 border-t border-gray-200 px-4 py-6">
                <h3 className="font-medium text-gray-900">Categorías</h3>
                <div className="mt-4 space-y-4">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <button
                        onClick={() => {
                          setActiveCategory(category);
                          setMobileFiltersOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md ${activeCategory === category ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        {category}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping cart sidebar */}
      <div id="cart-sidebar" className="fixed inset-y-0 right-0 z-50 w-full max-w-md transform translate-x-full transition-transform duration-300 ease-in-out">
        <div className="flex h-full flex-col bg-white shadow-xl">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-medium text-gray-900">Carrito de compras</h2>
              <button
                type="button"
                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                onClick={() => {
                  const sidebar = document.getElementById('cart-sidebar');
                  if (sidebar) {
                    sidebar.classList.add('translate-x-full');
                  }
                }}
              >
                {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
              </button>
            </div>

            <div className="mt-8">
              <div className="flow-root">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    {/* <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" /> */}
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Carrito vacío</h3>
                    <p className="mt-1 text-sm text-gray-500">Empieza a agregar productos a tu pedido</p>
                  </div>
                ) : (
                  <ul className="-my-6 divide-y divide-gray-200">
                    {cart.map((item, index) => (
                      <li key={index} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Cantidad: 1</p>
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => removeFromCart(index)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {cart.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Envío e impuestos calculados al finalizar.</p>
              <div className="mt-6">
                <button
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
                >
                  {/* Finalizar pedido <ArrowRightIcon className="ml-2 h-5 w-5" aria-hidden="true" /> */}
                </button>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  o{' '}
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => {
                      const sidebar = document.getElementById('cart-sidebar');
                      if (sidebar) {
                        sidebar.classList.add('translate-x-full');
                      }
                    }}
                  >
                    Continuar comprando
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
