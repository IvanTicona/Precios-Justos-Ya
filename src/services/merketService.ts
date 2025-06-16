import jsonServerInstance from "../api/jsonInstance";
import type { Market } from "../interfaces/marketInterface";

export const getMarkets = async () => {
  try {
    const response = await jsonServerInstance.get("/markets");
    return response.data;
  } catch (error) {
    console.error("Error fetching markets", error);
  }
};

export const createMarket = async (market: Market) => {
  try {
    const response = await jsonServerInstance.post("/markets", market);
    return response.data;
  } catch (error) {
    console.error("Error creating market:", error);
    throw error;
  }
};

export const updateMarket = async (market: Market) => {
  try {
    const response = await jsonServerInstance.put(`/markets/${market.id}`,market);
    return response.data;
  } catch (error) {
    console.error("Error updating market:", error);
    throw error;
  }
};

export const deleteMarket = async (marketId: String) => {
  try {
    const response = await jsonServerInstance.delete(`/markets/${marketId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting market:", error);
    throw error;
  }
};
