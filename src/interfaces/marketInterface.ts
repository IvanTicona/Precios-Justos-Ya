import type { Product } from "./productInterface";

export type TipoMercado = "zona" | "barrio" | "otro";

export interface Market {
  id: string;
  name: string;   // Esto pone el usuario
  description: string; // Esto 
  tipo: TipoMercado; //Esto
  latitude: number;   // Esto mas 
  longitude: number; // Esto
  imgUrl: string;  // Esto como opcional
  products: Product[];  // No se toca se genera vacio..

}
