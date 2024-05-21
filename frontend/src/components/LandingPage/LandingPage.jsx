import { useSelector } from 'react-redux';
import BookProgress from "../BookProgress/BookProgress"
import './LandingPage.css'


const LandingPage = () => {


  const user = useSelector(state => state.session.user)



  return (
    <div className='landing-page'>

      {!user &&
        <>
          <h1 className='title'>pizzareads</h1>

        </>

      }
      {user &&
        <>
          <BookProgress />
        </>
      }
    </div>
  )
}

export default LandingPage;
