import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/users/user");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data.data;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Something went wrong!"
      );
    }
  }
);

interface UserState {
  loading: boolean;
  user: User | null;
  isAuthenticated: boolean;
  error: string;
}

const initialState: UserState = {
  loading: true,
  user: null,
  isAuthenticated: false,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.isAuthenticated=false
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(
      fetchUser.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      }
    );
  },
});

export default authSlice.reducer;
