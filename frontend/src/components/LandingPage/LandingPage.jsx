import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import BookProgress from "../BookProgress/BookProgress";
import GoalProgress from "../BookProgress/GoalProgress";
import './LandingPage.css';

const LandingPage = () => {
  const user = useSelector(state => state.session.user);
  const titleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (titleRef.current) {
        const { clientX, clientY } = e;

        const xPos = (clientX / window.innerWidth - 0.5) * 150;
        const yPos = (clientY / window.innerHeight - 0.5) * 150;
        titleRef.current.style.backgroundPosition = `${xPos}px ${yPos}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {!user &&
        <div className='landing-page'>
          <h1 className='title' ref={titleRef}>pizzareads</h1>
        </div>
      }
      {user &&
        <>
          <div className='book-progress-lp'>
            <BookProgress />
            <div className='goal-prog-wrapper'>
              <GoalProgress />
            </div>
          </div>
          <div>
          </div>
        </>
      }
    </>
  );
};

export default LandingPage;
