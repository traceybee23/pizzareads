

const LOAD_BOOKS = 'books/LOAD_BOOKS'

const loadBooks = (books) => ({
  type: LOAD_BOOKS,
  books
})

export const fetchBooks = () => async dispatch => {
  const response = await fetch('/api/books')

  if (response.ok) {
    const books = await response.json();
    dispatch(loadBooks(books))
  }
}


const booksReducer = ( state = {}, action ) => {
  switch (action.type) {
    case LOAD_BOOKS: {
      const booksState = {}
      action.books.Books.forEach(book => {
        booksState[book.id] = book;
      })
      return booksState
    }
    default:
      return state;
  }
}

export default booksReducer;
