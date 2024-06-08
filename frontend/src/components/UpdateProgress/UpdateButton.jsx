import { useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import UpdateProgressModal from './UpdateProgressModal';
import LoginFormModal from "../LoginFormModal"
import { GiOpenBook } from "react-icons/gi";


const UpdateButton = ({progressId, book, navigate}) => {

  const user = useSelector(state => state.session.user)


  return (
    <>
      {user ? (
        <OpenModalButton
          buttonText={
            <span className='currently-reading'>
              <span className='book-icon'>
                <GiOpenBook />
              </span>
              <span className='cr-text'>&nbsp;update</span>
            </span>
          }
          modalComponent={<UpdateProgressModal progressId={progressId} book={book} navigate={navigate}/>}
        />
      ) : (

        <OpenModalButton
          buttonText={
            <span className='currently-reading'>
              <span className='book-icon'>
                <GiOpenBook />
              </span>
              <span className='cr-text'>&nbsp;update</span>
            </span>
          }
          modalComponent={<LoginFormModal navigate={navigate}/>}
        />
      )
    }
  </>
  )
}

export default UpdateButton;
