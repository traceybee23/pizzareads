import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './BookProgress.css'
import { fetchProgresses } from "../../store/progress";

const BookProgress = () => {

  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)

  const progresses = (useSelector(state => state.progress.BookProgress))

  console.log(progresses)

  useEffect(() => {
    dispatch(fetchProgresses(progresses, user.id))
  }, [dispatch, user.id, progresses])


  return (
    <div>
      BOOK PROGRESS
    </div>
  )
}

export default BookProgress;
