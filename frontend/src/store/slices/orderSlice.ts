import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/orders");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data.data;
    } catch (error: Error | unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : (error as string)
      );
    }
  }
);

interface OrderState {
  loading: boolean;
  orders: Order[];
  error: string | null;
}

const initialState: OrderState = {
  loading: true,
  orders: [],
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state: OrderState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllOrders.fulfilled,
        (state: OrderState, action: PayloadAction<Order[]>) => {
          state.loading = false;
          state.orders = action.payload;
          state.error = null;
        }
      )
      .addCase(
        getAllOrders.rejected,
        (state: OrderState, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.orders = [];
          state.error = action.payload as string;
        }
      );
  },
});


export default orderSlice.reducer
