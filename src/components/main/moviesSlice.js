import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    movies: [],
    moviesLoadingStatus: "idle"
}

export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    (url) => {
        const { request } = useHttp();
        return request(url)
    }
)

const movies = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchMovies.pending, state => { state.moviesLoadingStatus = "loading" })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.moviesLoadingStatus = "idle";
                state.movies = action.payload.Search;
            })
            .addCase(fetchMovies.rejected, state => { state.moviesLoadingStatus = "error" })
            .addDefaultCase(() => { })
    }
})

export default movies.reducer;