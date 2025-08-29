import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/products");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${data.message}`);
      }
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : (error as string)
      );
    }
  }
);
export const fetchQueryProducts = createAsyncThunk(
  "products/fetchQueryProducts",
  async (
    query: {
      sort: string;
      inStock: boolean;
      outOfStock: boolean;
      rating: number;
      price: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `/api/v1/products/query-products/?sort=${query.sort}&inStock=${query.inStock}&outStock=${query.outOfStock}&rating=${query.rating}&price=${query.price}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${data.message}`);
      }
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : (error as string)
      );
    }
  }
);
export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/products/product/${productId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${data.message}`);
      }
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : (error as string)
      );
    }
  }
);

interface ProductState {
  loading: boolean;
  products: Product[] | null;
  queryProducts: Product[] | null;
  error: string | null;
  product: Product | null;
}

const initialState: ProductState = {
  loading: true,
  products: null,
  queryProducts: null,
  error: null,
  product: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state: ProductState) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state: ProductState, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      }
    );
    builder.addCase(
      fetchProducts.rejected,
      (state: ProductState, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.products = null;
        state.error = action.payload as string;
      }
    );
    builder.addCase(fetchQueryProducts.pending, (state: ProductState) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchQueryProducts.fulfilled,
      (state: ProductState, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.queryProducts = action.payload;
        state.error = null;
      }
    );
    builder.addCase(
      fetchQueryProducts.rejected,
      (state: ProductState, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.queryProducts = null;
        state.error = action.payload as string;
      }
    );
    builder.addCase(
      getSingleProduct.fulfilled,
      (state: ProductState, action: PayloadAction<Product>) => {
        state.loading = false
        state.product = action.payload;
      }
    );
  },
});

export default productSlice.reducer;
