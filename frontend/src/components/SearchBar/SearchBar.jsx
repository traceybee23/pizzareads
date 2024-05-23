import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGoogleBooks } from '../../store/books';
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(fetchGoogleBooks(query)).then(() => {
        navigate('/books');
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for books..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
