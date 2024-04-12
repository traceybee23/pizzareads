const LOAD_BOOKS = 'books/LOAD_BOOKS'
const SINGLE_BOOK = 'books/SINGLE_BOOK'

const loadBooks = (books) => ({
  type: LOAD_BOOKS,
  books
})

const loadSingleBook = (book) => ({
  type: SINGLE_BOOK,
  book
})

export const fetchBooks = () => async dispatch => {
  const response = await fetch('/api/books')

  if (response.ok) {
    const books = await response.json();
    dispatch(loadBooks(books))
  }
}

export const fetchSingleBook = (bookId) => async dispatch => {
  const response = await fetch(`/api/books/${bookId}`)

  if (response.ok) {
    const bookData = await response.json();
    dispatch(loadSingleBook(bookData, bookId))
  } else {
    const errors = await response.json();
    return errors;
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
    case SINGLE_BOOK: {
      const bookState = {}
      bookState[action.book.id] = action.book
      return bookState;
    }
    default:
      return state;
  }
}

export default booksReducer;
