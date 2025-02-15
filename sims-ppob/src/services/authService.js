import apiMethods from "./apiMethods";

// Register
export const registerAPI = async (data) => {
  const response = await apiMethods.post("/registration", data);
  return response.data;
};

// Login
export const loginAPI = async (data) => {
  const response = await apiMethods.post("/login", data);
  return response.data;
};
