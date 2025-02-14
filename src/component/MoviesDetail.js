import { useEffect, useState } from "react";

function MovieDetail({ movieId }) {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer YOUR_ACCESS_TOKEN", // Replace with your actual token
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
                setMovie(data);
            })
            .catch((error) => console.error("Error fetching movie details:", error));
    }, [movieId]);

    if (!movie) {
        return <p>Loading movie details...</p>;
    }

    return (
        <div className="card" style={{ width: "18rem", margin: "20px" }}>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="card-img-top"
                alt={movie.title}
            />
            <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.overview}</p>
                <p><strong>Release Date:</strong> {movie.release_date}</p>
                <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
            </div>
        </div>
    );
}

export default MovieDetail;
