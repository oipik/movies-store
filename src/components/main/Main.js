import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../content/moviesSlice";

import "./main.scss";
import { logo } from "../../images";

const Main = () => {
    const [value, setValue] = useState('');

    const dispatch = useDispatch();
    const KEY = "5bedb772";

    function handleKeyDown(e, value) {
        if (e.key !== "Enter" || e.keyCode !== 13) {
            return;
        } else if ((e.key === "Enter" || e.keyCode === 13) && (value === "")) {
            alert("Вы ввели пустую строку!!!");
            return;
        }

        dispatch(fetchMovies(`http://www.omdbapi.com/?s=${value}&plot=full&apikey=${KEY}`))
    }

    return (
        <section className="main">
            <div className="main__header">
                <img className="main__logo" src={logo} alt="logo" />
                <input
                    className="main__search"
                    type="text"
                    placeholder="Search"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, value)} />
                <div className="main__icons"></div>
            </div>
        </section>
    )
}

export default Main;