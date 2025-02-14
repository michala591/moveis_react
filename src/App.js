import { useState } from 'react';
import './App.css';
import MovieDetail from './component/MoviesDetail';
import MovieList from './component/MoviesList';
import MoviesContext from './MoviesContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)

  return (
    <div className="App">
      <MoviesContext.Provider value={{ movies, setMovies, selectedMovie, setSelectedMovie }}>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<MovieList />} />
              <Route path="/moviesDetail/:id" element={<MovieDetail />} />
            </Routes>
          </div>
        </Router>
      </MoviesContext.Provider>
    </div>
  );
}

export default App;
