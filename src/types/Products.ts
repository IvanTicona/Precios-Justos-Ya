export type Product = {
  stock: any;
  imageUrl: string | undefined;
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  zone?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CartItem = Product & { quantity: number };