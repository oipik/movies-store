import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchMovies, fetchAddMovies, getAllMovies, changeVisibleButton } from "./moviesSlice";
import { KEY } from "../app/App";

import Spinner from "../../spinner/Spinner";
import { notFound } from "../../images";
import "./mainPage.scss";

const MainPage = () => {
    const dispatch = useDispatch();
    const data = useSelector(getAllMovies);
    const { moviesLoadingStatus, newMoviesLoadingStatus, visibleButton } = useSelector(state => state.movies);

    const getRandomPage = () => {
        const min = 1;
        const max = 20;
        return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    }

    let page = getRandomPage();

    useEffect(() => {
        dispatch(changeVisibleButton(true))
        dispatch(fetchMovies(`http://www.omdbapi.com/?s=requiem&plot=full&page=${page}&apikey=${KEY}`));
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [])

    const addMovies = () => {
        dispatch(fetchAddMovies(`http://www.omdbapi.com/?s=requiem&plot=full&page=${++page}&apikey=${KEY}`));
    }

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
                <div className="mainPage-box__btn">
                    <button
                        style={visibleButton ? { "visibility": "visible" } : { "visibility": "hidden" }}
                        className="mainPage__btn"
                        onClick={addMovies}
                        disabled={newMoviesLoadingStatus}>Load more</button>
                </div>
            </section>
        </>

    )
}

export default MainPage;