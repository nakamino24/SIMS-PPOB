import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProfileAPI, updateProfileAPI, fetchBalanceAPI, uploadProfilePictureAPI } from "../services/userService";

export const fetchProfile = createAsyncThunk("user/fetchProfile", fetchProfileAPI);
export const updateProfile = createAsyncThunk("user/updateProfile", updateProfileAPI);
export const fetchBalance = createAsyncThunk("user/fetchBalance", fetchBalanceAPI);
export const uploadProfilePicture = createAsyncThunk("user/uploadProfilePicture", uploadProfilePictureAPI);

const userSlice = createSlice({
  name: "user",
  initialState: { profile: null, balance: 0, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export default userSlice.reducer;
