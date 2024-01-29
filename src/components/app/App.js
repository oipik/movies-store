import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../header/Header';
import MainPage from '../mainPage/MainPage';
import Movie from '../movie/Movie';

import './app.scss';

export const KEY = "5bedb772";

function App() {

    return (
        <Router>
            <div className="App">
                <div className="container">
                    <Header />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="movie/:imdbID" element={<Movie />} />
                    </Routes>
                </div>
            </div>
        </Router>

    );
}

export default App;
