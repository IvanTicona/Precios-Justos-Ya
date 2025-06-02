export type Product = {
  stock: any;
  imageUrl: string | undefined;
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  zones?: string;
  createdAt?: string;
  updatedAt?: string;
  reports?: {
    id: number;
    userId: string;
    reportType: string;
    description: string;
    createdAt: string;
  }[];
};

export type CartItem = Product & { quantity: number };