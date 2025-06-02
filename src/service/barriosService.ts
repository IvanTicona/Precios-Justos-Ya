import jsonServerInstance from "../api/jsonInstance";

export const getBarrios = async () => {
  const response = await jsonServerInstance.get("/barrios");
  return response.data;
};
