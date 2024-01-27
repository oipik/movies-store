import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const moviesAdapter = createEntityAdapter({
    selectId: (movies) => movies.imdbID
});

const initialState = moviesAdapter.getInitialState({
    moviesLoadingStatus: "idle",
    newMoviesLoadingStatus: false,
    visibleButton: true
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

export const fetchAddMovies = createAsyncThunk(
    "movies/fetchAddMovies",
    (url) => {
        const { request } = useHttp();
        return request(url)
    }
)

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        changeVisibleButton: (state, action) => {
            state.visibleButton = action.payload;
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

            .addCase(fetchAddMovies.pending, state => { state.newMoviesLoadingStatus = true })
            .addCase(fetchAddMovies.fulfilled, (state, action) => {
                moviesAdapter.setMany(state, action.payload.Search);
                state.newMoviesLoadingStatus = false;
            })
            .addDefaultCase(() => { })
    }
})

export const { selectAll: getAllMovies } = moviesAdapter.getSelectors(state => state.movies);
export const { changeVisibleButton } = moviesSlice.actions;
export default moviesSlice.reducer;