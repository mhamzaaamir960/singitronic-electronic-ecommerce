import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/categories");
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

interface CategoryState {
  loading: boolean;
  categories: Category[] | null;
  error: string | null;
}

const initialState: CategoryState = {
  loading: true,
  categories: null,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchCategories.fulfilled,
      (state: CategoryState, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      }
    );
    builder.addCase(
      fetchCategories.rejected,
      (state: CategoryState, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.categories = null;
        state.error = action.payload as string;
      }
    );
  },
});

export default categorySlice.reducer;
