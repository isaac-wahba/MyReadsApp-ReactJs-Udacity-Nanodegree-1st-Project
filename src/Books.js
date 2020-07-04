import React from "react";
import Shelves from "./Shelves";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
class Books extends React.Component {
  state = {};

  updateShelves = (bookId, e) => {
    let currentBooks = this.props.presentedBooks;
    const book = currentBooks.filter(book => book.id === bookId)[0];
    book.shelf = e.target.value;
    BooksAPI.update(book, e.target.value).then(response => {
      this.setState({
        books: currentBooks
      });
    });
  };
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads App</h1>
        </div>
        <div className="list-books-content">
          <Shelves
            key="currently"
            books={this.props.presentedBooks.filter(book => book.shelf === "currentlyReading")}
            updateShelves={this.updateShelves}
            shelfTitle="Currently Reading"
          />
          <Shelves
            key="wantToRead"
            books={this.props.presentedBooks.filter(book => book.shelf === "wantToRead")}
            updateShelves={this.updateShelves}
            shelfTitle="Want to Read"
          />
          <Shelves
            key="read"
            books={this.props.presentedBooks.filter(book => book.shelf === "read")}
            updateShelves={this.updateShelves}
            shelfTitle="Read"
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default Books;
