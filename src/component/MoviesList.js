import { useContext, useEffect } from "react";
import MoviesContext from "../MoviesContext";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';  // לוודא ש- Bootstrap מוטמע בפרויקט שלך

function MovieList() {
    const { movies, setMovies } = useContext(MoviesContext);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-light">Movie Genres</h2>
            <div className="row">
                {movies.map((movie) => (
                    <div key={movie.id} className="col-md-4 mb-4">
                        <div className="card shadow-lg border-0 rounded">
                            <div className="card-body text-center">
                                <h5 className="card-title text-primary">{movie.name}</h5>
                                <p className="card-text text-muted">Explore the genre</p>
                                <Link to={`/moviesDetail/${movie.id}`} className="btn btn-primary w-100">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieList;
