import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const Dashboard = ({ movies }) => {
const user = useContext(AuthedUserContext);

  const userReviews = movies.reduce((acc, movie) => {
    const userMovieReviews = movie.reviews.filter(review => review.author === user._id);
    if (userMovieReviews.length > 0) {
      acc.push({ movieTitle: movie.title, reviews: userMovieReviews });
    }
    return acc;
  }, []);

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>This is your dashboard showing all reviews you've made:</p>
      <div>
        {userReviews.length > 0 ? (
          userReviews.map(({ movieTitle, reviews }, idx) => (
            <div key={idx}>
              <h2>Movie: {movieTitle}</h2>
              {reviews.map((review, reviewIdx) => (
                <div key={reviewIdx}>
                  <p><strong>Title:</strong> {review.title}</p>
                  <p><strong>Rating:</strong> {review.rating}</p>
                  <p><strong>Review:</strong> {review.text}</p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No reviews yet!</p>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
