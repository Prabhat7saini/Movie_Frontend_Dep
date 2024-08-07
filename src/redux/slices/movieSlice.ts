import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, UserState } from "../../utils/interface/types";

// Define the initial state for the user slice
const initialState: UserState = {
  loading: false,
  Movies: [],
  favMovie: [],
  issearch:false
};

// Create the user slice
const userSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setMovie(state, action: PayloadAction<Movie[]>) {
      state.Movies = action.payload
    },
    setFavMovie(state, action: PayloadAction<Movie[]>) {
      state.favMovie = action.payload
    },
    setIsSearch(state,action:PayloadAction<boolean>){
      state.issearch=action.payload
    }

  },
});

// Export actions
export const { setLoading, setMovie,setFavMovie ,setIsSearch} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
