import { useState, useEffect, useContext } from "react";
import { AuthedUserContext } from "../../App";

import { useParams, Link } from "react-router-dom";
import ReviewForm from "../ReviewForm/ReviewForm";
import * as movieService from '../../services/movieService'
import styles from './MovieDetails.module.css'

export default function MovieDetails(props){
    const loggedInUser = useContext(AuthedUserContext)

    const [movie, setMovie ] = useState(null)
    const [averageRating, setAverageRating] = useState(null);

    const {movieId} = useParams()
    console.log(movieId, 'movie ID')

    useEffect(() => {
        async function getMovie(){

            const movieData = await movieService.show(movieId)
            setMovie(movieData)
            console.log(movieData, '<---------------------MovieDetail Useeffect')

            if(movieData.reviews.length){
                calculateAverageRating(movieData.reviews)
            }
        }


        getMovie()
    }, [movieId])

    async function handleAddReview(reviewData){
        const newReview = await movieService.createReview(movieId, reviewData)
        console.log(newReview,'<--------------------------handleAddReview')
        setMovie(newReview)
        
        if (newReview.reviews.length) {
            calculateAverageRating(newReview.reviews); // Recalculate after adding a review
        }
    }

    async function handleDeleteReview(reviewId){
        const deletedReview = await movieService.deleteReview(movieId, reviewId)
        const updatedReviews = movie.reviews.filter((review) => review._id !== reviewId)
        setMovie({...movie, reviews: updatedReviews})
        
        if (updatedReviews.length) {
            calculateAverageRating(updatedReviews); // Recalculate after deleting a review
        } else {
            setAverageRating(null); // No reviews left
        }

    }

    const calculateAverageRating = (reviews) => {
        if (!reviews || reviews.length === 0) {
            setAverageRating(null); // If no reviews, reset the average rating
            return;
        }
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = totalRating / reviews.length;
        setAverageRating(avgRating.toFixed(1))
    }
    
    if(!movie) return <main>Loading...</main>

return(
    <>
    <main className={styles.main}>
        <header className={styles.header}>
            <h1>{movie.title}</h1>
            {averageRating && <p>Average Rating: {averageRating}/5</p>}
            <img src={movie.image} alt={movie.title}/>
            <p>Genre: {movie.genre.toUpperCase()}</p>
        </header>
        <p>{movie.description}</p>
    <section className={styles.section}>
        <h2>Reviews</h2>
        <ReviewForm handleAddReview={handleAddReview}/>
        {!movie.reviews.length && <p>There are no reviews</p>}

        {movie.reviews.map((review) => {
            return(
                //button to edit review
                <article key={review._id} >
                        <header>
                            <p>{review.authorName}</p>
                            <p>{review.title}</p>
                            <p>{review.rating}/5</p>
                        </header>
                        <p>{review.text}</p>
                        {loggedInUser && loggedInUser._id === review.author && <button onClick={() => handleDeleteReview(review._id)} className={styles['delete-button']}>Delete</button>}
                        {loggedInUser && loggedInUser._id === review.author && <button className={styles['edit-button']}><Link to={`/movies/${movieId}/reviews/${review._id}/edit`}>Edit</Link></button>}
                    </article>
            )
        })}
        </section>
    </main>
    </>
)
}