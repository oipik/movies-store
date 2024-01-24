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

export const fetchAddMovies = createAsyncThunk(
    "movies/fetchAddMovies",
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
            .addCase(fetchAddMovies.fulfilled, (state, action) => {
                state.movies = state.movies.concat(action.payload.Search);
            })
            .addDefaultCase(() => { })
    }
})

export default movies.reducer;