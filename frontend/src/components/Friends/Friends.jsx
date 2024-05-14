import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriends } from "../../store/friends";
import './Friends.css';

const Friends = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFriends())
  })

  return (
    <>
    <h2>friends</h2>
    </>
  )
}

export default Friends;
