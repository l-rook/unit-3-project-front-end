import { useState } from "react";
import { Link } from "react-router-dom";
import styles from './MovieList.module.css'; // Import the CSS module

export default function MovieList({ movies }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(movies, 'movies')
    const calculateAverageRating = (reviews) => {
        if (!reviews || reviews.length === 0) return "No reviews"; 
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = totalRating / reviews.length;
        return avgRating.toFixed(1);
    };
    const movieList = filteredMovies.map((movie) => {
        return (
            <Link key={movie._id} to={`/movies/${movie._id}`} className={styles.movieItem}>
                <article>
                    <header>
                        <h2>{movie.title}</h2>
                        <h3>Rating: {calculateAverageRating(movie.reviews)}/5</h3>
                    </header>
                    <img src={movie.image} alt={movie.title} />
                </article>
            </Link>
        );
    });

    return (
        <main className={styles.movieList}>
            <input
                type="text"
                placeholder="Search for a movie..."
                value={searchTerm}
                onChange={handleSearch}
            />
            {movieList.length ? movieList : <p>No movies found.</p>}
        </main>
    );
}