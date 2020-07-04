import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class SearchPage extends React.Component {

  constructor() {
    super();
    this.state = {
    query: "",
    books: []
    }
  }


  updateData = (books) => {
    const cBooks = books.map(book => {

      book.shelf = "none";
      this.props.presentedBooks.forEach(book2 => {
        if (book.id === book2.id) {
          book.shelf = book2.shelf;
        }
      })
      return book
    })
    this.setState({
      books: cBooks
    })
  }

  updateQuery = (query) => {
    this.setState({ query: query })
    if (query) {
      BooksAPI.search(query, 20).then((books) => {
        books.length > 0 ? this.updateData(books):this.setState({books:[]})
      }).catch((e)=> {
      console.error(`The API responded with an error: ${e}`);
    })
    }
    else
    {this.setState({books:[]})} 
  }

 
  updateBooks = (book, shelf)=> {
    let current = this.state.books;
    const bookToUpdate = current.filter(cBook => cBook.id === book.id)[0];
    bookToUpdate.shelf = shelf;
    this.setState({
      books: current
    })
    this.props.updateBookState(book, shelf);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.filter((book) => (book.imageLinks)).map(book =>
              <li key={book.id} className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: "url(" + book.imageLinks.thumbnail + ")"
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf}
                      onChange={e => {
                        this.updateBooks(book, e.target.value);
                      }}
                    >
                      <option disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">
                  {book.title}
                </div>
                {book.authors &&
                  <div className="book-authors">
                    {book.authors[0]}
                  </div>}
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
export default SearchPage;