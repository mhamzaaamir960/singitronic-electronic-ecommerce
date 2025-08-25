import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/cart");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${data.message}`);
      }
      console.log(data.data[0].items);
      return data.data[0].items;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : (error as string)
      );
    }
  }
);

const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/cart/product/${productId}`, {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${data.message}`);
      }
      toast.success(data.message);
      return data.message;
    } catch (error: unknown | Error) {
      toast.error(error instanceof Error ? error.message : (error as string));
      return rejectWithValue(
        error instanceof Error ? error.message : (error as string)
      );
    }
  }
);

const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/cart/product/${productId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${data.message}`);
      }
      toast.success(data.message);
      return data.message;
    } catch (error: Error | unknown) {
      toast.error(error instanceof Error ? error.message : (error as string));
      return rejectWithValue(
        error instanceof Error ? error.message : (error as string)
      );
    }
  }
);

const incrementQuantity = createAsyncThunk(
  "cart/incrementQuantity",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/cart/increment/${productId}`, {
        method: "PATCH",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${data.message}`);
      }
      toast.success(data.message);
      return data.message;
    } catch (error: Error | unknown) {
      toast.error(error instanceof Error ? error.message : (error as string));
      return rejectWithValue(
        error instanceof Error ? error.message : (error as string)
      );
    }
  }
);

const decreasedQuantity = createAsyncThunk(
  "cart/decreasedQuantity",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/cart/decrement/${productId}`, {
        method: "PATCH",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${data.message}`);
      }
      toast.success(data.message);
      return data.message;
    } catch (error: Error | unknown) {
      toast.success(error instanceof Error ? error.message : (error as string));
      return rejectWithValue(
        error instanceof Error ? error.message : (error as string)
      );
    }
  }
);

const getItemQuantity = createAsyncThunk(
  "cart/getItemQuantity",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/cart/product/${productId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${data.message}`);
      }
      return data.data;
    } catch (error: Error | unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : (error as string)
      );
    }
  }
);

const getTotalCartItems = createAsyncThunk(
  "cart/getTotalCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/cart/cart-items");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error :${data.message}`);
      }
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : (error as string)
      );
    }
  }
);

interface ItemsState {
  productId: Product;
  quantity: number;
}

interface CartState {
  loading: boolean;
  items: ItemsState[];
  itemQuantity: number;
  error: string | null;
  message: string | null;
  messageStatus: "success" | "error" | null;
  totalCartItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  loading: true,
  items: [],
  itemQuantity: 0,
  error: null,
  message: null,
  messageStatus: null,
  totalCartItems: 0,
  totalPrice: 0.0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.pending, (state: CartState) => {
      state.loading = true;
      state.items = [];
      state.error = null;
    });
    builder.addCase(
      fetchCartItems.fulfilled,
      (state: CartState, action: PayloadAction<ItemsState[]>) => {
        state.loading = false;
        state.items = action.payload;
        state.totalPrice = state.items.reduce(
          (acc: number, item) =>
            Number(acc) + Number(item.quantity) * Number(item.productId.price),
          0
        );
        state.error = null;
      }
    );
    builder.addCase(
      fetchCartItems.rejected,
      (state: CartState, action: PayloadAction<unknown | string>) => {
        state.loading = false;
        state.items = [];
        state.error = action.payload as string;
      }
    );
    builder.addCase(
      addToCart.fulfilled,
      (state: CartState, action: PayloadAction<string>) => {
        state.message = action.payload;
        state.messageStatus = "success";
      }
    );
    builder.addCase(
      addToCart.rejected,
      (state: CartState, action: PayloadAction<unknown>) => {
        state.message = action.payload as string;
        state.messageStatus = "error";
      }
    );
    builder.addCase(
      removeFromCart.fulfilled,
      (state: CartState, action: PayloadAction<string>) => {
        state.message = action.payload;
      }
    );
    builder.addCase(
      incrementQuantity.fulfilled,
      (state: CartState, action: PayloadAction<string>) => {
        state.message = action.payload;
      }
    );
    builder.addCase(
      decreasedQuantity.fulfilled,
      (state: CartState, action: PayloadAction<string>) => {
        state.message = action.payload;
      }
    );
    builder.addCase(
      getItemQuantity.fulfilled,
      (state: CartState, action: PayloadAction<number>) => {
        state.itemQuantity = action.payload;
      }
    );
    builder.addCase(
      getTotalCartItems.fulfilled,
      (state: CartState, action: PayloadAction<number>) => {
        state.totalCartItems = action.payload;
      }
    );
    builder.addCase(
      getTotalCartItems.rejected,
      (state: CartState, action: PayloadAction<unknown>) => {
        state.message = action.payload as string;
      }
    );
  },
});

export {
  fetchCartItems,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decreasedQuantity,
  getItemQuantity,
  getTotalCartItems,
};
export default cartSlice.reducer;
