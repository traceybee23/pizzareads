import { csrfFetch } from './csrf'

const LOAD_PROGRESS = 'progress/LOAD_PROGRESS'
const SINGLE_PROGRESS = 'progress/SINGLE_PROGRESS'

const loadProgresses = (progress) => ({
  type: LOAD_PROGRESS,
  progress
})

const loadSingleProgress = (progress) => ({
  type: SINGLE_PROGRESS,
  progress
})


export const fetchProgresses = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/progress/user/${userId}`)

  if (response.ok) {
    const progress = await response.json();
    dispatch(loadProgresses(progress))
  } else {
    const errors = await response.json();
    return errors;
  }
}

export const createProgress = (bookId, progress) => async dispatch => {
  const response = await csrfFetch(`/api/progress/books/${bookId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(progress)
  })

  if (response.ok) {
    const newProgress = await response.json();
    dispatch(loadSingleProgress(newProgress))
    return newProgress
  } else {
    const errors = await response.json();
    return errors;
  }
}

const progressReducer = (state = {}, action) => {

  switch (action.type) {
    case LOAD_PROGRESS: {
      const progressesState = {}
      action.progress.BookProgress.forEach(progress => {
        progressesState[progress.id] = progress
      })
      return progressesState
    }
    case SINGLE_PROGRESS: {
      const progressState = {}
      progressState[action.progress.id] = action.progress
      return progressState
    }
    default:
      return state
  }
}

export default progressReducer;
