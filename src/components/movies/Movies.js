import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchMovies, getAllMovies, filterChanged } from "./moviesSlice";
import { KEY } from "../app/App";

import Spinner from "../../spinner/Spinner";
import { notFound } from "../../images";
import "./movies.scss";

const Movies = () => {
    const [state, setState] = useState('');
    
    const dispatch = useDispatch();
    const data = useSelector(getAllMovies);
    const { moviesLoadingStatus, activeFilter } = useSelector(state => state.movies);

    useEffect(() => {
        if (Object.keys(data).length === 0) {
            dispatch(fetchMovies(`http://www.omdbapi.com/?s=Spider+Man&apikey=${KEY}`));
        }
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [])

    const handleSelected = (e) => {
        setState(e.target.value);
        dispatch(filterChanged(e.target.value))
    }

    if (moviesLoadingStatus === "loading") {
        return <Spinner />
    } else if (moviesLoadingStatus === "error") {
        return <p className="error">Ошибка! Попробуйте снова.</p>
    }
    console.log("hello!")
    function renderItems(data, activeFilter) {
        console.log(data);
        if (activeFilter === "yearDown") data.sort((a, b) => b.Year - a.Year);
        if (activeFilter === "yearUp") data.sort((a, b) => a.Year - b.Year);
        if (activeFilter === "default") data.sort((a, b) => a.Title.localeCompare(b.Title))

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

    const elements = moviesLoadingStatus !== "loading" ? renderItems(data, activeFilter) : null;

    return (
        <>
             <div className="select">
                <select className="standard-select" value={state} onChange={handleSelected}>
                    <option value="default">По умолчанию</option>
                    <option value="yearDown">По дате убыванию</option>
                    <option value="yearUp">По дате возрастанию</option>
                </select>
                <span className="focus"></span>
            </div>

            <section className="mainPage">
                <div className="mainPage__inner">
                    {elements}
                </div>
            </section>
        </>

    )
}

export default Movies;