import { useState, useEffect, useContext } from "react";
import { AuthedUserContext } from "../../App";

import { useParams, Link } from "react-router-dom";
import ReviewForm from "../ReviewForm/ReviewForm";
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
            console.log(movieData, '<---------------------MovieDetail Useeffect')
        }

        getMovie()
    }, [movieId])

    async function handleAddReview(reviewData){
        const newReview = await movieService.createReview(movieId, reviewData)
        console.log(newReview,'<--------------------------handleAddReview')
        setMovie(newReview)
    }

    async function handleDeleteReview(reviewId){
        const deletedReview = await movieService.deleteReview(movieId, reviewId)
        setMovie({...movie, reviews: movie.reviews.filter((review) => review._id !== reviewId)})
    }
    
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
        <ReviewForm handleAddReview={handleAddReview}/>
        {!movie.reviews.length && <p>There are no reviews</p>}

        {movie.reviews.map((review) => {
            return(
                //button to edit review
                <article key={review._id} >
                        <header>
                            <p>{review.authorName}</p>
                            {loggedInUser && loggedInUser._id === review.author && <button onClick={() => handleDeleteReview(review._id)}>Delete</button>}
                            {loggedInUser && loggedInUser._id === review.author && <Link to={`/movies/${movieId}/reviews/${review._id}/edit`}>Edit</Link>}
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