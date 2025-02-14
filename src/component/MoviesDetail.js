import { useContext, useEffect } from "react";
import MoviesContext from "../MoviesContext";
import { useParams } from "react-router-dom";


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
    }, []);

    if (!selectedMovie) {
        return <p>Loading movie details...</p>;
    }

    return (
        <div className="card" style={{ width: "18rem", margin: "20px" }}>
            <div class="card" style={{ width: "18rem" }}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                    className="card-img-top"
                    alt={selectedMovie.title}
                />
                <div class="card-body">
                    <h5 class="card-title">{selectedMovie.title}</h5>
                    <p class="card-text">{selectedMovie.overview}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Release Date:</strong> {selectedMovie.release_date}</li>
                    <li class="list-group-item"><strong>Rating:</strong> {selectedMovie.vote_average} / 10</li>
                </ul>
                <div class="card-body">
                    <a href="#/" class="card-link">Card link</a>
                    <a href="#/" class="card-link">Another link</a>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
