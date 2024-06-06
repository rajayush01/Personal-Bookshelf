import React, { useState, useEffect } from 'react';

const PersonalBookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const booksFromStorage = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(booksFromStorage);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Bookshelf</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bookshelf.map((book) => (
          <div key={book.key} className="bg-white rounded-md shadow-md p-4">
            <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={book.title} className="w-full h-48 object-cover mb-2" />
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalBookshelfPage;