import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    try {
      const response = await fetch(`/api/search_books?q=${query}`);
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Google Books Search</h1>
      <div>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Enter search query" 
        />
        <button onClick={searchBooks}>Search</button>
      </div>
      <div>
        {books.map((book) => (
          <div key={book.id}>
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
