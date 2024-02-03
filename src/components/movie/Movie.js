import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovie } from "./movieSlice";
import { KEY } from "../app/App";

import Spinner from "../../spinner/Spinner";
import { notFound } from "../../images";
import "./movie.scss";

const Movie = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const data = useSelector(state => state.movie.movie);
    const movieLoadingStatus = useSelector(state => state.movie.movieLoadingStatus);

    useEffect(() => {
        dispatch(fetchMovie(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=${KEY}`));
    }, [id, dispatch])

    if (movieLoadingStatus === "loading") {
        return <Spinner />
    } else if (movieLoadingStatus === "error") {
        return <p className="error">Ошибка! Попробуйте снова.</p>
    }

    const rating = data.Ratings === undefined ? null : (data.Ratings.length > 0 ? `${data.Ratings[0].Source}: ${data.Ratings[0].Value}` : "Рейтинг отсутствует");
    const img = data.Poster !== "N/A" ? data.Poster : notFound;
    const title = data.Title !== "N/A" ? data.Title : "Название отсутствует";
    const description = data.Plot !== "N/A" ? data.Plot : "Описание отсутствует";
    const year = data.Year !== "N/A" ? data.Year : "Год выхода отсутствует"
    const producer = data.Director !== "N/A" ? data.Director : "Режиссер неизвестен";
    const country = data.Country !== "N/A" ? data.Country : "Страна не указана";
    const language = data.Language !== "N/A" ? data.Language : "Язык не указан";
    const runtime = data.Runtime !== "N/A" ? data.Runtime : "Продолжительность не указана";

    return (
        <>
            <button className="movie-btn__goback" onClick={() => navigate(-1)}>Назад</button>
            <section className="movie">
                <div className="movie__inner">
                    <div className="movie__items">
                        <div className="movie-img__box">
                            <img className="movie__img" src={img} alt={title} />
                        </div>
                        <div className="movie__content">
                            <h1 className="movie__title">{title}</h1>
                            <p className="movie__descr">{description}</p>
                            <div className="movie__description">
                                <ul className="movie__list">
                                    <li className="movie__list-item">
                                        <span>Год выхода: </span>
                                        <span>{year}</span>
                                    </li>
                                    <li className="movie__list-item">
                                        <span>Режиссер: </span>
                                        <span>{producer}</span>
                                    </li>
                                    <li className="movie__list-item">
                                        <span>Страна: </span>
                                        <span>{country}</span>
                                    </li>
                                    <li className="movie__list-item">
                                        <span>Язык: </span>
                                        <span>{language}</span>
                                    </li>
                                    <li className="movie__list-item">
                                        <span>Продолжительность: </span>
                                        <span>{runtime}</span>
                                    </li>
                                    <li className="movie__list-item">
                                        <span>Рейтинг: </span>
                                        <span>{rating}</span>
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
