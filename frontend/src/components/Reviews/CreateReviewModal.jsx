import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createReview } from '../../store/reviews';
import StarRatingInput from './StarRatingInput';


const CreateReview = ({ bookId }) => {

  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const sessionUser = useSelector(state => state.session.user);

  const [username, setUsername] = useState('')
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0)
  const [errors, setErrors] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors({})

    if (sessionUser) setUsername(sessionUser.username)
    const newReview = {
      review,
      stars,
      username: username
    }
    await dispatch(createReview(bookId, newReview))

      .then(closeModal)
      .catch(async (response) => {
        const data = await response.json();
        if (data && data.errors) {
          setErrors(data.errors)
        }
      })
  }

  const onChange = (number) => {
    setStars(parseInt(number))
  }

  useEffect(() => {
    let errObj = {}
    if (!review) errObj.review = "review is required."
    if (review && review.length < 10) errObj.review = "reviews must be at least 85 characters in length.";
    if (review && review.length > 2000) errObj.review = "reviews must be 2000 characters in length at most.";
    if (!stars) errObj.stars = "star rating is required."
    setErrors(errObj);
  }, [review, stars])


  return (
    <>
      <div className='reviewForm'>
        <h2>how was the book?</h2>
        <form onSubmit={handleSubmit}>
          {errors.review && <span className='errors'>{errors.review}</span>}
          {errors.stars && <span className='errors'>{errors.stars}</span>}
          <textarea
            className='reviewTextArea'
            placeholder='Leave your review here...'
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows="4"
          />
          <StarRatingInput
            onChange={onChange}
            stars={stars}
          />
          <button type='submit' disabled={(review.length < 10) || (!stars)}>submit your review</button>
        </form>
      </div>
    </>
  )

}

export default CreateReview;
