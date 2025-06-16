export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  zone_id: string;
  isEdited: boolean;
  reportCount?: number;
}
