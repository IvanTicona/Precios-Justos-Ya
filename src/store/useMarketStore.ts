import { create } from "zustand";

import type { Market } from "../interfaces/marketInterface";
import { createMarket, deleteMarket, getMarkets, updateMarket } from "../services/merketService";


interface MarketStore {
  markets: Market[];
  isLoading: boolean;
  error: string | null;

  getMarkets: () => void;
  deleteMarket: (marketId: string) => void;
  createMarket: (market: Market) => void;
  updateMarket: (market: Market) => void;
}


export const useMarketStore = create<MarketStore>((set) => ({
  markets: [],
  isLoading: false,
  error: null,

  getMarkets: async () => {
    try {
      set({ isLoading: true });
      const marketsResponse = await getMarkets();
      set({ markets: marketsResponse });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        set({ error: error.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  deleteMarket: async (marketId: string) => {
    try {
      set({ isLoading: true });
      await deleteMarket(marketId);
      set((state) => ({
        markets: state.markets.filter((market) => market.id !== marketId),
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

  createMarket: async (market: Market) => {
    try {
      set({ isLoading: true });
      const marketResponse = await createMarket(market);
      if (!marketResponse) {
        throw new Error("No se logro Crear el mercado");
      }
      set((state) => ({
        markets : [...state.markets, marketResponse],
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

  updateMarket: async (market: Market) => {
    try {
      set({ isLoading: true });
      const marketResponse = await updateMarket(market);
      if (!marketResponse) {
        throw new Error("No se logro Actualizar el mercado");
      }
      set((state) => ({
        markets: state.markets.map((market) =>
          market.id === marketResponse.id ? marketResponse : market
        ),
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
}));