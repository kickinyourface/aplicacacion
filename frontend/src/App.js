import React, { useState } from 'react';

function App() {
  const [lastFetchStatus, setLastFetchStatus] = useState(true);
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    try {
      const urlBackAPI = "http://localhost:3001/api/search_books"
      const queryParams = new URLSearchParams({ q: query }).toString();
      const response = await fetch(`${urlBackAPI}?${queryParams}`);

      // check if the response is "OK"
      if (response.status === 200) {
        setLastFetchStatus(true);
        const data = await response.json();
        setBooks(data.items || []);
        return;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // if response was not successful
    setBooks([]);
    setLastFetchStatus(false);
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
        <br />
        <span
          style={{
            color: "red",
            visibility: lastFetchStatus ? "hidden" : "inherit"
          }}
        >
          Error while getting the fetched response
        </span>
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
