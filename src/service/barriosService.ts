import jsonServerInstance from "../api/jsonInstance";

export const getBarrios = async () => {
  const response = await jsonServerInstance.get("/zones");
  return response.data;
};
