
import { csrfFetch } from './csrf'

const LOAD_PROGRESS = 'progress/LOAD_PROGRESS'

const loadProgresses = (progress) => ({
  type: LOAD_PROGRESS,
  progress
})


export const fetchProgresses = (progress, userId) => async dispatch => {
  const response = await csrfFetch(`/api/progress/user/${userId}`)

  if (response.ok) {
    const progress = await response.json();
    dispatch(loadProgresses(progress, userId))
  } else {
    const errors = await response.json();
    return errors;
  }
}

const progressReducer = (state = {}, action) => {

  switch (action.type) {
    case LOAD_PROGRESS: {
      const progressesState = {...state}
      action.progress.BookProgress.forEach(progress => {
        console.log(progressesState, "REDUCER")
        console.log(action, "REDUCER2")
        console.log(action.progress.BookProgress, "REDUCER3")
      })
      return progressesState
    }
    default:
      return state
  }
}

export default progressReducer;
