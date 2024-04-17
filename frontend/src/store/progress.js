import { csrfFetch } from './csrf'

const LOAD_PROGRESS = 'progress/LOAD_PROGRESS'
const SINGLE_PROGRESS = 'progress/SINGLE_PROGRESS'
const UPDATE_PROGRESS = 'progress/UPDATE_PROGRESS'
const REMOVE_PROGRESS = 'progress/REMOVE_PROGRESS'

const loadProgresses = (progress) => ({
  type: LOAD_PROGRESS,
  progress
})

const loadSingleProgress = (progress) => ({
  type: SINGLE_PROGRESS,
  progress
})

const editProgress = (progress) => ({
  type: UPDATE_PROGRESS,
  progress
})

const removeProgress = (progressId) => ({
  type: REMOVE_PROGRESS,
  progressId
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

export const updateProgress = (progressId, progress) => async dispatch => {

  const response = await csrfFetch(`/api/progress/${progressId}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(progress)
  })

  if (response.ok) {
    const updatedProgress = await response.json();
    dispatch(editProgress(updatedProgress));
    return updatedProgress
  } else {
    const errors = await response.json();
    return errors;
  }
}

export const deleteProgress = ({progressId}) => async dispatch => {
  const response = await csrfFetch(`api/progress/${progressId}`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(removeProgress(progressId));
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
    case UPDATE_PROGRESS: {
      return { ...state, [action.progress.id]: action.progress }
    }
    case REMOVE_PROGRESS: {
      const newState = {...state}
      delete newState[action.progressId]
      return newState
    }
    default:
      return state
  }
}

export default progressReducer;
