from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

@app.route('/api/search_books', methods=['GET'])
def search_books():
    query = request.args.get('q')
    if not query:
        return jsonify({'error': 'Missing query parameter'}), 400
    
    # Llamar a la API de Google Books
    google_books_api_url = f'https://www.googleapis.com/books/v1/volumes?q={query}'
    response = requests.get(google_books_api_url)
    
    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({'error': 'Failed to fetch data from Google Books API'}), 500

if __name__ == '__main__':
    app.run(debug=True)
