import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/movies/${id}`)
            .then(response => response.json())
            .then(data => setMovie(data))
            .catch(error => console.error('Error fetching movie:', error));
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="container">
            <header>
                <h1>Movie Detail</h1>
            </header>
            <div className="movie-detail">
                <h2>{movie.title}</h2>
                <p><strong>Year:</strong> {movie.year}</p>
                <p><strong>Director:</strong> {movie.director}</p>
                <p><strong>Genre:</strong> {movie.genre}</p>
            </div>
            <footer>
                <p>&copy; 2024 Abdisalam Kadir</p>
            </footer>
        </div>
    );
};

export default MovieDetail;