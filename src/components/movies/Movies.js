import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchMovies, getAllMovies } from "./moviesSlice";
import { KEY } from "../app/App";

import Spinner from "../../spinner/Spinner";
import { notFound } from "../../images";
import "./movies.scss";

const Movies = () => {
    console.log(useLocation());
    const dispatch = useDispatch();
    const data = useSelector(getAllMovies);
    const { moviesLoadingStatus } = useSelector(state => state.movies);

    useEffect(() => {
        dispatch(fetchMovies(`http://www.omdbapi.com/?s=Spider+Man&apikey=${KEY}`));
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [])

    if (moviesLoadingStatus === "loading") {
        return <Spinner />
    } else if (moviesLoadingStatus === "error") {
        return <p className="error">Ошибка! Попробуйте снова.</p>
    }

    function renderItems(data) {
        const items = data.map((item, i) => {
            const img = item.Poster === "N/A" ? notFound : item.Poster
            return (
                <div className="mainPage__item" key={i}>
                    <Link to={`/movie/${item.imdbID}`} className="mainPage__link" href="#">
                        <img className="mainPage__img" src={img} alt={item.Title} />
                        <div className="mainPage__descr">
                            <p className="mainPage__title">{item.Title}</p>
                            <p className="mainPage__year">{item.Year}</p>
                        </div>
                    </Link>
                </div>
            )
        })
        return (
            <div className="mainPage__items">
                {items}
            </div>
        )
    }

    const elements = moviesLoadingStatus !== "loading" ? renderItems(data) : null;

    return (
        <>
            <section className="mainPage">
                <div className="mainPage__inner">
                    {elements}
                </div>
            </section>
        </>

    )
}

export default Movies;