import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGoogleBooks } from '../../store/books';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '../../store/search';
import { IoSearchOutline } from "react-icons/io5";


const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

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

  const handleSearch = () => {
    dispatch(setSearchQuery(query))
  }

  return (
    <form className='search-container' onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="what are you reading?"
      />
      <button onClick={handleSearch} type="submit"><IoSearchOutline /></button>
    </form>
  );
};

export default SearchBar;
