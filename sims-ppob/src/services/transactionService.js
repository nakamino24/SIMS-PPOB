import apiMethods from "./apiMethods";

// Fetch Services
export const fetchServicesAPI = async () => {
  const response = await apiMethods.get("/services");
  return response.data;
};

// Fetch Transaction History
export const fetchHistoryAPI = async (params) => {
  const response = await apiMethods.get("/history", params);
  return response.data;
};

// Create Transaction
export const createTransactionAPI = async (data) => {
  const response = await apiMethods.post("/transaction", data);
  return response.data;
};

// Top-Up Balance
export const topUpBalanceAPI = async (amount) => {
  const response = await apiMethods.post("/topup", { amount });
  return response.data;
};
