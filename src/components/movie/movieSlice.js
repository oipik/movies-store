import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    movie: {},
    movieLoadingStatus: "idle",
}

export const fetchMovie = createAsyncThunk(
    "movie/fetchMovie",
    (url) => {
        const { request } = useHttp();
        return request(url)
    }
)

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchMovie.pending, state => { state.movieLoadingStatus = "loading" })
            .addCase(fetchMovie.fulfilled, (state, action) => {
                state.movieLoadingStatus = "idle";
                state.movie = action.payload;
            })
            .addCase(fetchMovie.rejected, state => { state.movieLoadingStatus = "error" })
            .addDefaultCase(() => {})
    }
})

export default movieSlice.reducer;