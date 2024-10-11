import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as movieService from '../../services/movieService'

export default function ReviewForm(props){
    const [formData, setFormData] = useState({
        title: '',
        text: '',
        rating: 0
    })

    const { movieId, reviewId } = useParams()

    const Navigate = useNavigate()


    useEffect(() => {
        async function getReview(){
            const reviewData = await movieService.show(movieId)
            setFormData(reviewData.reviews.find((review) => review._id === reviewId))
        }
        if(reviewId && movieId){
            getReview()
        }
    }, [movieId, reviewId])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (reviewId && movieId){
            movieService.updateReview(movieId, reviewId, formData)
            Navigate(`/movies/${movieId}`)
        } else{
            props.handleAddReview(formData);
        }
        setFormData({
            title: '',
            text: '',
            rating: 0
        })
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" name="title" value={formData.title} onChange={handleChange}/>
            </label>
            <label>
                Text:
                <input type="text" name="text" value={formData.text} onChange={handleChange}/>
            </label>
            <label>
                Rating:
                <input type="number" name="rating" min="0" max="5" value={formData.rating} onChange={handleChange}/>
            </label>
            <button>Submit</button>
        </form>
        </>
    )
}