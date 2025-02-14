import { useContext, useEffect, useState } from "react";
import MoviesContext from "../MoviesContext";
import { Link } from "react-router-dom";


function MovieList() {
    const { movies, setMovies } = useContext(MoviesContext)
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", {
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGJjODhjMDEzYTZjMzVmZTI4OWE0ZGY5M2JlZDk3MyIsIm5iZiI6MTczOTUxODY0OC4wMDMsInN1YiI6IjY3YWVmMmI3ODBmNzZkNjFlYjhlNjMyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ufMYloZ5nWd6X2ql6EKYyWznkxihoEXFKsRqTAilC4s", // Replace with your token
                "Accept": "application/json"
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setMovies(data.genres))
            .catch((error) => console.error("Error fetching genres:", error));
    }, []);

    return (
        <div>
            <h2>Movie Genres</h2>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <Link to={`/moviesDetail/${movie.id}`}>{movie.name}</Link>
                    </li>))}
            </ul>
        </div>
    );
}

export default MovieList;
