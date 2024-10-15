
import { Link } from "react-router-dom";
import styles from './MovieList.module.css'; // Import the CSS module
export default function MovieList({ movies }) {
    const movieList = movies.map((movie) => {
        return (
            <Link key={movie._id} to={`/movies/${movie._id}`} className={styles.movieItem}>
                <article>
                    <header>
                        <h2>{movie.title}</h2>
                    </header>
                    <img src={movie.image} alt={movie.title} />
                </article>
            </Link>
        );
    });
    return (
        <main className={styles.movieList}>
            {movieList}
        </main>
    );
}