import { useEffect, useState } from "react";

function MovieList() {
    const [genres, setGenres] = useState([]);

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
            .then((data) => setGenres(data.genres))
            .catch((error) => console.error("Error fetching genres:", error));
    }, []);

    return (
        <div>
            <h2>Movie Genres</h2>
            <ul>
                {genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default MovieList;
