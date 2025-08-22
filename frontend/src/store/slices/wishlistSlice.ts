import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/wishlist`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data.data;
    } catch (error: unknown | Error) {
      return rejectWithValue(
        error instanceof Error ? error.message : (error as string)
      );
    }
  }
);

const toogleItemWishlit = createAsyncThunk(
  "wishlist/toogleItemWishlit",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/wishlist/${productId}`, {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${data.message}`);
      }
      toast.success(data.message);
      return data.data;
    } catch (error: Error | unknown) {
      toast.error(error instanceof Error ? error.message : (error as string));
      return rejectWithValue(
        error instanceof Error ? error.message : (error as string)
      );
    }
  }
);

const removeItemFromWishlist = createAsyncThunk(
  "wishlist/removeItemFromWishlit",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/wishlist/${productId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${data.message}`);
      }
      toast.success(data.message);
      return data.data;
    } catch (error: Error | unknown) {
      toast.error(error instanceof Error ? error.message : (error as string));
      return rejectWithValue(
        error instanceof Error ? error.message : (error as string)
      );
    }
  }
);
const checkItemInWishlist = createAsyncThunk(
  "wishlist/checkItemInWishlist",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/wishlist/${productId}`);
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


interface WishlistState {
  loading: boolean;
  items: Product[] | null;
  totalItems: number;
  isItemInWishlist: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  loading: true,
  items: null,
  totalItems: 0,
  isItemInWishlist: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWishlist.pending, (state: WishlistState) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(
      fetchWishlist.fulfilled,
      (state: WishlistState, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
        state.totalItems = state.items.length
        state.error = null;
      }
    );
    builder.addCase(
      fetchWishlist.rejected,
      (state: WishlistState, action: PayloadAction<unknown | string>) => {
        state.loading = false;
        state.items = null;
        state.totalItems = 0;
        state.error = action.payload as string;
      }
    );
    builder.addCase(
      checkItemInWishlist.fulfilled,
      (state: WishlistState, action: PayloadAction<boolean>) => {
        state.loading = false;
        state.error = null;
        state.isItemInWishlist = action.payload;
      }
    );
  },
});

export {
  fetchWishlist,
  toogleItemWishlit,
  removeItemFromWishlist,
  checkItemInWishlist,
};
export default wishlistSlice.reducer;
