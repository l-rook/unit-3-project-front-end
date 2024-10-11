import { useState, useEffect, useContext } from "react";
import { AuthedUserContext } from "../../App";

import { useParams, Link } from "react-router-dom";

import * as movieService from '../../services/movieService'

export default function MovieDetails(props){
    const loggedInUser = useContext(AuthedUserContext)

    const [movie, setMovie ] = useState(null)

    const {movieId} = useParams()
    console.log(movieId, 'movie ID')

    useEffect(() => {
        async function getMovie(){

            const movieData = await movieService.show(movieId)
            setMovie(movieData)
        }

        getMovie()
    }, [movieId])

    
    if(!movie) return <main>Loading...</main>

return(
    <>
    <main>
        <header>
            <h1>{movie.title}</h1>
            <p>Genre: {movie.genre.toUpperCase()}</p>
        </header>
        <p>{movie.description}</p>
    <section>
        <h2>Reviews</h2>
        {!movie.reviews.length && <p>There are no reviews</p>}

        {movie.reviews.map((review) => {
            return(
                <article key={review._id}>
                    <header>
                        <p>{review.authorName}</p>
                        <p>{review.title}</p>
                        <p>{review.rating}/5</p>
                    </header>
                    <p>{review.text}</p>
                    
                </article>
            )
        })}
        </section>
    </main>
    </>
)
}