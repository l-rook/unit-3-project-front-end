
import { Link } from "react-router-dom";

export default function MovieList({movies}){

    const movieList = movies.map((movie) => {
        return(
            <Link key={movie._id} to={`/movies/${movie._id}`}>
                <article>
                    <header>
                        <h2>{movie.title}</h2>
                    </header>
                    <p>{movie.text}</p>
                </article>
            </Link>
        )
    })

    return(
        <main>{movieList}</main>
    )
}