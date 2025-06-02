// src/services/productService.ts
import jsonServerInstance from "../api/jsonInstance";
import type { Product } from "../types/Products";

// Obtener todos los productos
export const getProducts = async () => {
  const response = await jsonServerInstance.get("/products");
  return response.data;
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await jsonServerInstance.get("/products");
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};


export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await jsonServerInstance.get(`/products/${id}`);
    const product = response.data;
    if (!product || Object.keys(product).length === 0) {
      return null;
    }
    return product;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};
