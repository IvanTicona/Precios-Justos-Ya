import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Button,
  Chip,
  Card,
  Badge,
  Alert,
  Avatar,
} from '@heroui/react';
import type { Product } from '../types/Products';
import { fetchProductById } from '../service/productService';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handlePublishPrice = () => {
    console.log(`Publicar nuevo precio para ${product?.name}`);
  };

  if (loading) return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <div className="p-4 text-center">Cargando producto...</div>
      </Card>
    </div>
  );

  if (!product) return (
    <div className="container mx-auto px-4 py-8">
      <Alert color="danger" className="text-center">
        Producto no encontrado
      </Alert>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/app/productos')}
        className="mb-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <Card className="p-4">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-auto rounded-lg object-cover max-h-96"
          />
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Disponible en:</h3>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(product.zone) ? product.zone.map((zone, index) => (
                <Chip key={index} color="primary" variant="bordered">
                  {zone.replace('mercado-', '').replace(/-/g, ' ')}
                </Chip>
              )) : product.zone ? (
                <Chip color="primary" variant="bordered">
                  {product.zone.replace('mercado-', '').replace(/-/g, ' ')}
                </Chip>
              ) : null}
            </div>
          </div>
        </Card>
        
        <div>
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <Chip color="success" className="mb-3">
                  {product.category}
                </Chip>
              </div>
              <Badge color="primary" className="text-lg">
                Bs {product.price.toFixed(2)}
              </Badge>
            </div>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <Button
              onClick={handlePublishPrice}
              className="w-full bg-green-500 hover:bg-green-600 py-3"
              size="lg"
            >
              Publicar Precio
            </Button>

            {/* Reportes */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold">Reportes Recientes</h3>
                <Badge color="danger" className="px-2 py-1">
                  {product.reports?.length || 0}
                </Badge>
              </div>
              
              {product.reports && product.reports.length > 0 ? (
                <div className="space-y-3">
                  {product.reports.map((report, index) => (
                    <Card 
                      key={index} 
                      className="p-4 border border-red-100 bg-red-50 hover:bg-red-100 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar 
                          size="sm" 
                          src={`https://i.pravatar.cc/150?u=${report.userId}`}
                          className="flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-red-700 capitalize">
                              {report.reportType}
                            </span>
                            <span className="text-xs text-gray-500">
                              {(() => {
                                const d = new Date(report.createdAt);
                                return isNaN(d.getTime()) ? "Fecha inválida" : d.toLocaleDateString();
                              })()}
                            </span>
                          </div>
                          <p className="text-sm text-red-600 mt-1">
                            {report.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Alert color="primary">
                  No hay reportes para este producto
                </Alert>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};