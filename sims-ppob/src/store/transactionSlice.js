import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchServicesAPI, fetchHistoryAPI, createTransactionAPI, topUpBalanceAPI } from "../services/transactionService";

export const fetchServices = createAsyncThunk("transaction/fetchServices", fetchServicesAPI);
export const fetchHistory = createAsyncThunk("transaction/fetchHistory", fetchHistoryAPI);
export const createTransaction = createAsyncThunk("transaction/createTransaction", createTransactionAPI);
export const topUpBalance = createAsyncThunk("transaction/topUpBalance", topUpBalanceAPI);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: { services: [], history: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services = action.payload;
      });
  },
});

export default transactionSlice.reducer;
