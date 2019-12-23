/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import { func, arrayOf } from 'prop-types';
import { bookPropType } from '@constants/propTypes';

import actionsCreators from '../../../redux/book/actions';

import Book from './components/Book';
import Search from './components/Search';
import ShoppingCart from './components/ShoppingCart';
import styles from './styles.scss';

class App extends Component {
  componentDidMount = () => this.props.getBooks();

  onSearch = value => {
    const { originalData, searchBooks } = this.props;
    const books = originalData.filter(book => book.name.toLowerCase().includes(value));
    searchBooks(books);
  };

  addToCart = item => this.props.addToCart(item);

  addItem = itemId => {
    const { addItem, bookSelected } = this.props;
    const books = [...bookSelected];
    const book = books.find(({ id }) => id === itemId);
    book.quantity++;
    addItem(books);
  };

  removeItem = itemId => {
    const { removeItem, bookSelected } = this.props;
    const books = bookSelected.filter(book => book.id !== itemId);
    removeItem(books);
  };

  CONFIGURATION_BUTTON = {
    add: {
      text: 'Add to cart',
      function: this.addToCart
    },
    remove: {
      text: 'Remove',
      function: this.removeItem,
      isDanger: true
    }
  };

  renderBooks = item => {
    const showButton = !this.props.bookSelected.some(el => el.id === item.id);
    const configButton = showButton ? this.CONFIGURATION_BUTTON.add : this.CONFIGURATION_BUTTON.remove;
    return <Book key={item.id} data={item} configButton={configButton} />;
  };

  render() {
    const { books, bookSelected } = this.props;
    return (
      <Fragment>
        <Navbar />
        <div className={styles.container}>
          <Search onSearch={this.onSearch} />
          {books.length ? (
            books.map(this.renderBooks)
          ) : (
            <div className={styles.noData}>
              <h2 className={styles.title}>No Data</h2>
            </div>
          )}
        </div>
        {!!bookSelected.length && (
          <ShoppingCart data={bookSelected} addItem={this.addItem} removeItem={this.removeItem} />
        )}
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  books: state.books,
  bookSelected: state.bookSelected,
  originalData: state.originalData
});

const mapDispatchToProps = dispatch => ({
  getBooks: () => dispatch(actionsCreators.getBooks()),
  searchBooks: value => dispatch(actionsCreators.searchBook(value)),
  addToCart: item => dispatch(actionsCreators.addToCart(item)),
  removeItem: itemId => dispatch(actionsCreators.removeItem(itemId)),
  addItem: itemId => dispatch(actionsCreators.addItem(itemId))
});

App.propTypes = {
  getBooks: func.isRequired,
  searchBooks: func.isRequired,
  addToCart: func.isRequired,
  removeItem: func.isRequired,
  addItem: func.isRequired,
  books: arrayOf(bookPropType),
  bookSelected: bookPropType,
  originalData: arrayOf(bookPropType)
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
