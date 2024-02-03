import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const moviesAdapter = createEntityAdapter({
    selectId: (movies) => movies.imdbID
});

const initialState = moviesAdapter.getInitialState({
    moviesLoadingStatus: "idle",
    activeFilter: ""
})

export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    async (url, { rejectWithValue }) => {
        const { request } = useHttp();
        const response = await request(url);
        if (response.Response === "True") {
            return response;
        } else if (response.Response === "False") {
            return rejectWithValue('Movie not found');
        }
    }
)

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        filterChanged: (state, action) => {
            state.activeFilter = action.payload;
        }   
    },
    extraReducers: builder => {
        builder
            .addCase(fetchMovies.pending, state => { state.moviesLoadingStatus = "loading" })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.moviesLoadingStatus = "idle";
                moviesAdapter.setAll(state, action.payload.Search);
            })
            .addCase(fetchMovies.rejected, state => { state.moviesLoadingStatus = "error" })
            .addDefaultCase(() => { })
    }
})

export const { selectAll: getAllMovies } = moviesAdapter.getSelectors(state => state.movies);
export const { filterChanged } = moviesSlice.actions;

export default moviesSlice.reducer;