import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMovies, fetchAddMovies, getAllMovies } from "./moviesSlice";

import Spinner from "../../spinner/Spinner";
import { notFound } from "../../images";
import "./content.scss";

const Content = () => {
    const dispatch = useDispatch();
    const data = useSelector(getAllMovies);
    const { moviesLoadingStatus, newMoviesLoadingStatus } = useSelector(state => state.movies);

    const KEY = "5bedb772";

    const getRandomPage = () => {
        const min = 1;
        const max = 20;
        return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    } 

    let page = getRandomPage();
    
    useEffect(() => {
        dispatch(fetchMovies(`http://www.omdbapi.com/?s=requiem&plot=full&page=${page}&apikey=${KEY}`));
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [])

    const addMovies = () => {
        dispatch(fetchAddMovies(`http://www.omdbapi.com/?s=requiem&plot=full&page=${++page}&apikey=${KEY}`));
    }

    if (moviesLoadingStatus === "loading") {
        return <Spinner/>
    } else if (moviesLoadingStatus === "error") {
        return <p className="error">Ошибка введенных данных! Попробуйте снова.</p>
    }

    function renderItems(data) {
        const items = data.map((item, i) => {
            const img = item.Poster === "N/A" ? notFound : item.Poster
            return (
                <div className="content__item" key={i}>
                    <a className="content__link" href="#">
                        <img className="content__img" src={img} alt={item.Title} />
                        <div className="content__descr">
                            <p className="content__title">{item.Title}</p>
                            <p className="content__year">{item.Year}</p>
                        </div>
                    </a>
                </div>
            )
        })
        return (
            <div className="content__items">
                {items}
            </div>
        )
    }

    const elements = moviesLoadingStatus !== "loading" ? renderItems(data) : null;

    return (
        <section className="content">
            <div className="content__inner">
                {elements}
            </div>
            <div className="content-box__btn">
                <button 
                className="content__btn" 
                onClick={addMovies}
                disabled={newMoviesLoadingStatus}>Load more</button>
            </div>
        </section>
    )
}

export default Content;