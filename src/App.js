import React from "react";
import * as BooksAPI from "./BooksAPI";
import Books from "./Books";
import SearchPage from "./SearchPage";
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    selectedBooks: [],
  };
  componentDidMount() {
    this.updateAllData();
  }
  updateAllData = () => {
    BooksAPI.getAll().then((data) => {
      this.setState({
        selectedBooks: data,
      });
    });
  };

  updateBookState = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
      this.updateAllData();
    });
  };

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Route
            exact
            path="/"
            render={() => <Books existingBooks={this.state.selectedBooks} />}
          />

          <Route
            path="/search"
            render={() => (
              <SearchPage
                updateBookState={this.updateBookState}
                existingBooks={this.state.selectedBooks}
              />
            )}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default BooksApp;
