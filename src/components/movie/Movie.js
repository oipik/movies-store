import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovie } from "./movieSlice";
import { KEY } from "../app/App";

import Header from "../header/Header";
import "./movie.scss";

const Movie = () => {
    const { imdbID } = useParams();

    const dispatch = useDispatch();
    const data = useSelector(state => state.movie.movie);

    console.log(data)

    useEffect(() => {
        dispatch(fetchMovie(`http://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${KEY}`));
    }, [imdbID])

    console.log(data.Ratings === true ? "equal" : "not true")
    // console.log(data.Ratings === 0 ? "another" : data.Ratings)

    return (
        <>
            <Header />
            <section className="movie">
                <div className="movie__inner">
                    <div className="movie__items">
                        <div className="movie-img__box">
                            <img className="movie__img" src={data.Poster} alt={data.Title} />
                        </div>
                        <div className="movie__content">
                            <h1 className="movie__title">{data.Title}</h1>
                            <p className="movie__descr">{data.Plot}</p>
                            <div className="movie__description">
                                <ul className="movie__list">
                                    <li className="movie__list-item">
                                        <span>Год выхода: </span>
                                        <span>{data.Year}</span>
                                    </li>
                                    <li className="movie__list-item">
                                        <span>Режиссер: </span>
                                        <span>{data.Director}</span>
                                    </li>
                                    <li className="movie__list-item">
                                        <span>Страна: </span>
                                        <span>{data.Country}</span>
                                    </li>
                                    <li className="movie__list-item">
                                        <span>Язык: </span>
                                        <span>{data.Language}</span>
                                    </li>
                                    <li className="movie__list-item">
                                        <span>Время: </span>
                                        <span>{data.Runtime}</span>
                                    </li>
                                    <li className="movie__list-item">
                                        <span>Рейтинг: </span>
                                        <span>
                                            {/* {data.Ratings !== undefined ? `${data.Ratings[0].Source}: ${data.Ratings[0].Value}` : "N/A"} */}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Movie;
