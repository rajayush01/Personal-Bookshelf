import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookSearchPage from './components/BookSearchPage';
import PersonalBookshelfPage from './components/PersonalBookshelfPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookSearchPage />} />
        <Route path="/bookshelf" element={<PersonalBookshelfPage />} />
      </Routes>
    </Router>
  );
};

export default App;
