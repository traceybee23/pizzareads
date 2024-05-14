const LOAD_FRIENDS = 'friends/LOAD_FRIENDS'

const loadFriends = (friends) => ({
  type: LOAD_FRIENDS,
  friends
})


export const fetchFriends = () => async dispatch => {
  const response = await fetch('/api/friends')

  if (response.ok) {
    const friends = await response.json();
    dispatch(loadFriends(friends))
  }
}


const friendsReducer = ( state = {}, action ) => {
  switch (action.type) {
    case LOAD_FRIENDS: {
      const friendsState = {}
      action.friends.Friends.forEach(friend => {
        friendsState[friend.id] = friend;
      })
      return friendsState
    }
    default:
      return state;
  }
}

export default friendsReducer;
