// src/pages/ReportPage.tsx
import React, { useEffect, useState } from "react";
import CommentComponent from "../components/CommentComponent";
import { ReportCardModal } from "../components/ReportCardModalComponent";
import { getProducts } from "../service/productService";

export function ReportPage() {
  const [products, setProducts] = useState<
    { id: number; name: string; imageUrl: string; stock: number }[]
  >([]);

  useEffect(() => {
    getProducts().then((data) => {
      const sorted = data.sort((b, a) => b.stock - a.stock);
      const top8 = sorted.slice(0, 8);
      setProducts(top8);
    });
  }, []);

  return (
    <div className="p-6 lg:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.map((prod) => (
            <ReportCardModal
              key={prod.id}
              title={prod.name}
              img={
                prod.imageUrl ||
                "https://www.trainerclub.es/wp-content/uploads/12.jpg"
              }
              stock={prod.stock}
            />
          ))}
        </div>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold mb-2">
              Porcentaje de Precios Justos
            </h1>
            <p className="text-gray-600 mb-4 text-sm">
              Este es un porcentaje general de cómo los precios son justos en
              todas las zonas
            </p>
            <h2 className="text-5xl font-extrabold text-indigo-600 text-center">
              80%
            </h2>
          </div>
          <div className="h-8"></div>
          <div className="w-full max-w-md space-y-4">
            <CommentComponent />
            <CommentComponent />
            <CommentComponent />
            <CommentComponent />
            <CommentComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
