import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Fetch movies from the API
        fetch('http://localhost:3000/api/movies')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    return (
        <div>
            <header>
                <h1>Movies</h1>
            </header>
            <ul>
                {items.length > 0 ? (
                    items.map(movie => (
                        <li key={movie._id}>
                            <Link to={`/detail/${movie._id}`}>{movie.title}</Link>
                        </li>
                    ))
                ) : (
                    <p>No movies available</p>
                )}
            </ul>
        </div>
    );
};

export default HomePage;