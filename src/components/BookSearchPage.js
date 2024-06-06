import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BookSearchPage = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      if (query.trim() !== '') {
        setLoading(true); // Set loading to true before fetching
        const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
        const data = await response.json();
        setBooks(data.docs);
        setLoading(false); // Set loading to false after fetching
      } else {
        setBooks([]);
      }
    };

    fetchBooks();
  }, [query]);

  const handleAddToBookshelf = (book) => {
    const booksFromStorage = JSON.parse(localStorage.getItem('bookshelf')) || [];
    localStorage.setItem('bookshelf', JSON.stringify([...booksFromStorage, book]));
  };

  const navigateToBookshelf = () => {
    navigate('/bookshelf');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row justify-center items-center mb-4">
        <div className='flex flex-col justify-center items-center w-full md:w-3/4'>
          <span>Search by Book Name</span>
          <input
            type="text"
            placeholder="Search by book name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mt-5 border border-black rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="ml-4">
          <button onClick={navigateToBookshelf} className="bg-green-500 text-white px-4 py-2 rounded-md">
            My Bookshelf
          </button>
        </div>
      </div>
      {loading ? (
        <div className="text-center text-lg">Your books are loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book) => (
            <div key={book.key} className="bg-white rounded-md shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">Book Title: {book.title}</h3>
              <p className="mb-2">Edition Count: {book.edition_count}</p>
              <button
                onClick={() => handleAddToBookshelf(book)}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Add to Bookshelf
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookSearchPage;
