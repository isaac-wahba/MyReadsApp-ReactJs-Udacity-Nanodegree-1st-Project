import React from "react";
import * as BooksAPI from "./BooksAPI";
import Books from "./Books";
import SearchPage from "./SearchPage";
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    shownBooks: [],
  };
  componentDidMount() {
    this.updateAllData()
  }

  updateBookState = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      this.updateAllData()
    })
  }

  updateAllData = () => {
    BooksAPI.getAll().then(data => {
            this.setState({
              shownBooks: data
            })
    });    
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Route
            exact
            path="/"
            render={() => <Books presentedBooks={this.state.shownBooks} />}
          />

          <Route
            path="/search"
            render={() => (
              <SearchPage
              updateBookState={this.updateBookState}
              presentedBooks={this.state.shownBooks}
              />
            )}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default BooksApp;
