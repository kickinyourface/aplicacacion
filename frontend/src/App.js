import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import './App.css';

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
   <Container maxWidth="md">
      <Typography variant="h1" gutterBottom>
        Google Books Search
      </Typography>
      <div>
        <TextField
          label="Enter search query"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={searchBooks} style={{ marginTop: '10px' }}>
          Search
        </Button>
      </div>
      <div className="book-container">
        {books.map((book) => (
          <div className="book" key={book.id}>
            <Typography variant="h3" gutterBottom>
              {book.volumeInfo.title}
            </Typography>
            <Typography variant="body1">
              {book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}
            </Typography>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </Container>
  );
}

export default App;