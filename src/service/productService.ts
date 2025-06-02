// src/services/productService.ts
import jsonServerInstance from "../api/jsonInstance";

// Obtener todos los productos
export const getProducts = async () => {
  const response = await jsonServerInstance.get("/products");
  return response.data;
};

