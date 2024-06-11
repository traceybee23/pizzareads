import { useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ProgressFormModal from "./ProgressFormModal";
import LoginFormModal from "../LoginFormModal"
import { GiOpenBook } from "react-icons/gi";
import './ProgressForm.css'


const ProgressButton = ({navigate}) => {

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
              <span className='cr-text'>&nbsp;currently reading </span>
            </span>
          }
          modalComponent={<ProgressFormModal navigate={navigate}/>}
        />
      ) : (

        <OpenModalButton
          buttonText={
            <span className='currently-reading'>
              <span className='book-icon'>
                <GiOpenBook />
              </span>
              <span className='cr-text'>&nbsp;currently reading </span>
            </span>
          }
          modalComponent={<LoginFormModal navigate={navigate}/>}
        />
      )
    }
  </>
  )
}

export default ProgressButton;
