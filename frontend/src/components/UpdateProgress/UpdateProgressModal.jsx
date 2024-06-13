import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { updateProgress } from '../../store/progress';
import { fetchProgresses } from '../../store/progress';
import { restoreUser } from '../../store/session';

const UpdateProgressModal = ({progressId, book, navigate}) => {

  console.log(progressId, book, "UPM ")

  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)

  const userProgress = Object.values(useSelector(state => state.progress))
  const complete = userProgress.filter(progress => progress.completed === true);
  const count = complete.length;

  const bookProgress = userProgress.find(progress => progress.bookId === book.id)

  const currPagesRead = bookProgress ? bookProgress.pagesRead : book.pagesRead;

  const totalPages = book.totalPages

  const [strPagesRead, setPagesRead] = useState(currPagesRead);
  const [errors, setErrors] = useState({});

  let pagesRead = +strPagesRead

  const { closeModal } = useModal();

  const coupons = Object.values(useSelector(state => state.userCoupon));
  const coupwithnoredeemdate = coupons.find(coupon => coupon.redeemedDate === null);

  console.log(coupons, !!coupwithnoredeemdate,"COUPONS IN UPDATE PROG FORM MODAL")


  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({})


    const updatedProgress = { pagesRead };
    if (pagesRead === totalPages) {
      updatedProgress.completed = true;
    }

    dispatch(updateProgress(progressId, updatedProgress))
    .then(() => {
      dispatch(fetchProgresses(user.id));
      closeModal();
      navigate('/')
    })
  }

  useEffect(() => {

    dispatch(fetchProgresses(user.id))
    .then(() => dispatch(restoreUser()))
  }, [dispatch, user.id])

  useEffect(() => {

    let errObj = {}

    if (count === 6 && user.milestone < 1) errObj.coupon = 'please redeem your current coupon'
    if (count === 12 && user.milestone < 2) errObj.coupon = 'please redeem your current coupon'
    if (count === 18 && user.milestone < 3) errObj.coupon = 'please redeem your current coupon'
    if (coupwithnoredeemdate) errObj.coupon = 'please redeem your current coupon'
    if (!pagesRead) errObj.pagesRead = "pages read is required"
    if (pagesRead && pagesRead > totalPages) errObj.pagesRead = "pages read cannot be greater than total pages"
    if (pagesRead && !Number.isInteger(+pagesRead)) errObj.pagesRead = "pages read is invalid"
    if (pagesRead && pagesRead < currPagesRead) errObj.pagesRead = "pages read must be greater than your previous progress"

    setErrors(errObj)

  }, [pagesRead, totalPages, setErrors, currPagesRead, coupwithnoredeemdate, count, user.milestone])



  return (
    user &&
    <div className='progress-form'>
      <h1 className='heading'>what page are you on?</h1>
      <form onSubmit={handleSubmit}>
      <span>
        <input
          style={{backgroundColor: "#ffffff"}}
          type="text"
          value={strPagesRead}
          onChange={e => setPagesRead(e.target.value)}
          placeholder='pages read'
        /> <span style={{backgroundColor: "#ffffff", fontSize: "large"}}>/{totalPages}</span></span>
        {errors.pagesRead && <span className="errors">&nbsp;{errors.pagesRead}</span>}
        {errors.coupon && <span className="errors">&nbsp;{errors.coupon}</span>}
        <button
          disabled={!!Object.values(errors).length}
          className='add-book-progress'
          type='submit'
        >
          update book progress
        </button>
      </form>
    </div>
  )
}

export default UpdateProgressModal;
