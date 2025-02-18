import { useContext, useEffect } from "react";
import MoviesContext from "../MoviesContext";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';  // לוודא ש- Bootstrap מוטמע בפרויקט שלך

function MovieDetail() {
    const { id } = useParams(); // Get movie id from URL
    const { selectedMovie, setSelectedMovie } = useContext(MoviesContext);

    useEffect(() => {
        if (!id) return;
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
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
            .then((data) => {
                console.log("Fetched movie:", data);
                setSelectedMovie(data);
            })
            .catch((error) => console.error("Error fetching movie details:", error));
    }, [id]);

    if (!selectedMovie) {
        return <p>Loading movie details...</p>;
    }

    return (
        <div className="container mt-5">
            <div className="card mb-4 shadow-lg border-0 rounded">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                            className="card-img-top rounded-start"
                            alt={selectedMovie.title}
                            style={{ maxHeight: '500px', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h3 className="card-title">{selectedMovie.title}</h3>
                            <p className="card-text">{selectedMovie.overview}</p>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><strong>Release Date:</strong> {selectedMovie.release_date}</li>
                                <li className="list-group-item"><strong>Rating:</strong> {selectedMovie.vote_average} / 10</li>
                            </ul>
                            <div className="card-body">
                                <a href="#/" className="card-link text-primary">More Info</a>
                                <a href="#/" className="card-link text-secondary">Watch Trailer</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
