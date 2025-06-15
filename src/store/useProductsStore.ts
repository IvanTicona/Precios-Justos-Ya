import { create } from "zustand";
import type { Product } from "../interfaces/productInterface";
import { createProduct, deleteProduct, editProduct, getAllProducts, getAllZones, getProduct, getProductHistory, getProductsByName } from "../services/productService";
import type { Zone } from "../interfaces/zoneInterface";

interface ProductsStore {
  products: Product[];
  zones: Zone[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => void;
  fetchProduct: (productId: string) => Promise<Product | null>;
  createProduct: (product: Product) => Promise<void>;
  editProduct: (originalProduct: Product, updatedProduct: Partial<Product>) => Promise<void>;
  deleteProduct: ( productId: string ) => void;
  getAllZones: () => void;
  fetchProductHistory: (productName: string) => Promise<Product[]>;
  fetchProductsByName: (productName: string) => Promise<Product[]>;
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  zones: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    try {
      set({ isLoading: true });
      const response = await getAllProducts();
      set({ products: response });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch products";
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProduct: async (productId: string) => {
    try {
      set({ isLoading: true, error: null });
      const product = await getProduct(productId);
      return product;
    } catch (error) {
      console.error("Error in fetchProduct:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch product";
      set({ error: errorMessage });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  
  createProduct: async (product) => {
    try {
      set({ isLoading: true, error: null });
      const response = await createProduct(product);
      if (!response) {
        throw new Error("No se logro Crear el producto");
      }
      set((state) => ({
          products: [...state.products, response],
      }));
      } catch (error) {
        console.error("Error creating product:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to create product";
        set({ error: errorMessage });
      } finally {
        set({ isLoading: false });
      }
  },
  editProduct: async (originalProduct: Product, updatedProduct: Partial<Product>) => {
    try {
      set({ isLoading: true, error: null });
      const responseProduct = await editProduct(originalProduct, updatedProduct);
      if (!responseProduct) {
        throw new Error("No se logró actualizar el producto");
      }
      set((state) => ({
        products: [
          ...state.products.filter((p) => p.id !== originalProduct.id && !p.isEdited),
          responseProduct
        ],
      }));
    } catch (error) {
      console.error("Error editing product:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to edit product";
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProduct: async ( productId: string ) => {
    try{
        set({isLoading:true})
        await deleteProduct(productId);
        set((state) => ({
            products: state.products.filter((product) => product.id !== productId),
        }));
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        set({ error: error.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },
  getAllZones: async () => {
    try{
        set({isLoading:true})
        const response = await getAllZones();
        set({ zones: response });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        set({ error: error.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },
  fetchProductHistory: async (productName: string) => {
      try {
        set({ isLoading: true, error: null });
        const history = await getProductHistory(productName);
        return history;
      } catch (error) {
        console.error("Error in fetchProductHistory:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch product history";
        set({ error: errorMessage });
        return [];
      } finally {
        set({ isLoading: false });
      }
    },
  fetchProductsByName: async (productName: string) => {
    try {
      set({ isLoading: true, error: null });
      const products = await getProductsByName(productName);
      return products;
    } catch (error) {
      console.error("Error in fetchProductsByName:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch products by name";
      set({ error: errorMessage });
      return [];
    } finally {
      set({ isLoading: false });
    }
  },
}));