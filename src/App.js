import React from 'react'
import * as BooksAPI from './BooksAPI';
import Books from './Books';
import SearchPage from './SearchPage'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books:[],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
 
  }

  render() {
    return (
      <div className="app">
        <Books currentBooks={this.state.books} />
        <SearchPage/>
      </div>
    )
  }
}

export default BooksApp;
