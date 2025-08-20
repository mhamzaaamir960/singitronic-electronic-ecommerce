import { createSlice } from "@reduxjs/toolkit";

// const fetchCategories  = createAsyncThunk("category/fetchCategories" , async() => {
//     try {
//         const response = await fetch("/api/v1/categories/")
//     } catch (error) {

//     }
// })

interface CategoryState {
  category: Category | null;
}

const initialState: CategoryState = {
  category: null,
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {},
});


export default categorySlice.reducer
