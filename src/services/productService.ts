import jsonServerInstance from "../api/jsonInstance.ts";
import type { Product } from "../interfaces/productInterface.ts";
import type { Zone } from "../interfaces/zoneInterface.ts";
import { v4 as uuidv4 } from "uuid";


export const getProduct = async (prodId: string) => {
  try {
    const response = await jsonServerInstance.get(`/products/${prodId}`);    
    return response.data as Product;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const createProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await jsonServerInstance.post(`/products`, product);
    return response.data as Product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};


export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await jsonServerInstance.delete(`/products/${productId}`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const updateProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await jsonServerInstance.put(`/products/${product.id}`, product);
    return response.data as Product;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};  

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await jsonServerInstance.get(`/products`);
    return response.data as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getAllZones = async (): Promise<Zone[]> => {
  try {
    const response = await jsonServerInstance.get(`/zones`);
    return response.data as Zone[];
  } catch (error) {
    console.error("Error fetching zones:", error);
    throw error;
  }
};

export const getProductHistory = async (productName: string): Promise<Product[]> => {
  try {
    const response = await jsonServerInstance.get(`/products?name=${productName}&isEdited=true`);
    return response.data as Product[];
  } catch (error) {
    console.error("Error fetching product history:", error);
    throw error;
  }
};

export const markProductAsEdited = async (productId: string): Promise<void> => {
  try {
    await jsonServerInstance.patch(`/products/${productId}`, { isEdited: true });
  } catch (error) {
    console.error("Error marking product as edited:", error);
    throw error;
  }
};

export const editProduct = async (originalProduct: Product, updatedProduct: Partial<Product>): Promise<Product> => {
  try {
    // Mark the original product as edited
    await markProductAsEdited(originalProduct.id);
    
    // Create a new product with the updated values
    const newProduct = {
      ...originalProduct,
      ...updatedProduct,
      id: uuidv4(), // Generate new ID for the new product
      isEdited: false // New product is not edited
    };
    
    const response = await createProduct(newProduct);
    return response;
  } catch (error) {
    console.error("Error editing product:", error);
    throw error;
  }
};

export const getProductsByName = async (productName: string): Promise<Product[]> => {
  try {
    const response = await jsonServerInstance.get(`/products?name=${productName}&isEdited=false`);
    return response.data as Product[];
  } catch (error) {
    console.error("Error fetching products by name:", error);
    throw error;
  }
};