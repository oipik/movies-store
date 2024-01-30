import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../movies/moviesSlice";

import "./header.scss";
import { logo } from "../../images";

const Header = () => {
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
        <>
            <section className="header">
                <div className="header__header">
                    <img className="header__logo" src={logo} alt="logo" />
                    <input
                        className="header__search"
                        type="text"
                        placeholder="Search"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, value)} />
                    <div className="header__icons"></div>
                </div>
            </section>
        </>
    )
}

export default Header;