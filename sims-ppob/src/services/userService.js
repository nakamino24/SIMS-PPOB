import apiMethods from "./apiMethods";

// Fetch User Profile
export const fetchProfileAPI = async () => {
  const response = await apiMethods.get("/profile");
  return response.data;
};

// Update Profile
export const updateProfileAPI = async (data) => {
  const response = await apiMethods.put("/profile/update", data);
  return response.data;
};

// Update Profile Picture
export const uploadProfilePictureAPI = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await apiMethods.post("/profile/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

// Fetch Balance
export const fetchBalanceAPI = async () => {
  const response = await apiMethods.get("/balance");
  return response.data;
};
