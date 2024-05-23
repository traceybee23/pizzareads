const LOAD_BOOKS = 'books/LOAD_BOOKS'
const SINGLE_BOOK = 'books/SINGLE_BOOK'
const GOOGLE_BOOKS = 'books/GOOGLE_BOOKS'

const loadBooks = (books) => ({
  type: LOAD_BOOKS,
  books
})

const loadSingleBook = (book) => ({
  type: SINGLE_BOOK,
  book
})


const googleBooks = (books, itemCount) => ({
  type: GOOGLE_BOOKS,
  books,
  itemCount
})

export const fetchGoogleBooks = (query, startIndex=0, maxResults=10) => async (dispatch) => {
  try {
    const response = await fetch(`/api/books/google/${query}?startIndex=${startIndex}&maxResults=${maxResults}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data, "THUNKKKK")
      dispatch(googleBooks(data.Books, data.itemCount));
    }
  } catch (error) {
    console.error(error);
    // Handle error
  }
};

export const fetchBooks = () => async dispatch => {
  const response = await fetch('/api/books')

  if (response.ok) {
    const books = await response.json();
    dispatch(loadBooks(books))
  } else {
    const errors = await response.json();
    return errors;
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
    case GOOGLE_BOOKS: {
      return {
        ...state,
        loading: false,
        error: null,
        books: action.books,
        itemCount: action.itemCount
      };
    }
    default:
      return state;
  }
}

export default booksReducer;
