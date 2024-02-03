import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../header/Header';
import Movies from '../movies/Movies';
import Movie from '../movie/Movie';

import './app.scss';

export const KEY = "5bedb772";

function App() {

    return (
        <Router>
            <div className="App">
                <div className="container">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <Header />
                                <Movies />
                            </>
                        } />
                        <Route path="/movie/:id" element={<Movie />} />
                    </Routes>
                </div>
            </div>
        </Router>

    );
}

export default App;
