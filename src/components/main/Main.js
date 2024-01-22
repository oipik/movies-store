import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "./moviesSlice";

import "./main.scss";
import { logo } from "../../images";

const Main = () => {
    const [value, setValue] = useState('');
    const [data, setData] = useState({});

    const KEY = "5bedb772";
    const getData = useSelector(state => state.movies.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMovies(`http://www.omdbapi.com/?s=requiem&apikey=${KEY}`));
    }, [])

    // async function handleKeyDown(e) {
    //     if (e.key !== "Enter" || e.keyCode !== 13) {
    //         return;
    //     }

    //     // `http://www.omdbapi.com/?apikey=${KEY}&t=${value}&plot=full`
    //     const response = await fetch(`http://www.omdbapi.com/?s=${value}&plot=full&apikey=${KEY}`)
    //     if (response.ok) {
    //         const data = await response.json();
    //         setData(data);
    //         console.log(data)
    //     } else {
    //         alert("Ошибка №" + response.status);
    //     }
    // }
    return (
        <div className="main">
            <div className="main__header">
                <img className="main__logo" src={logo} alt="logo" />
                <input
                    className="main__search"
                    type="text"
                    placeholder="Search"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    // onKeyDown={(e) => handleKeyDown(e)} 
                    />
                <div className="main__icons"></div>
                <div></div>
            </div>
            <div className="main__content">

            </div>
        </div>
    )
}

export default Main;