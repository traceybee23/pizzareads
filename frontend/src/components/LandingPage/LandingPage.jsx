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
          <img className="purple-grid-0" src="../../purple-grid.png" />
          <img className="pizza-dood-0" src="../../pizza-dood.png" />
          <img className="ribbon-accent-0" src="../../ribbon-accent.png" />
          <img className="blue-grid-0" src="../../blue-grid.png" />
        </>

      }
      {user &&
        <>
          <img className="purple-grid" src="../../purple-grid.png" />
          <img className="pizza-dood" src="../../pizza-dood.png" />
          <img className="ribbon-accent" src="../../ribbon-accent.png" />
          <img className="blue-grid" src="../../blue-grid.png" />
          <BookProgress />
        </>
      }
    </div>
  )
}

export default LandingPage;
