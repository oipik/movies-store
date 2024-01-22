import { configureStore } from "@reduxjs/toolkit";
import movies from "../components/main/moviesSlice";

const store = configureStore({
    reducer: { movies }
})

export default store;