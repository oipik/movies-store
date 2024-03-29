import { configureStore } from "@reduxjs/toolkit";
import movies from "../components/movies/moviesSlice";
import movie from "../components/movie/movieSlice";

const store = configureStore({
    reducer: { movies, movie }
})

export default store;