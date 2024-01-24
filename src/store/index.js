import { configureStore } from "@reduxjs/toolkit";
import movies from "../components/content/moviesSlice";

const store = configureStore({
    reducer: { movies }
})

export default store;