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
  componentDidMount() {
    this.props.getBooks();
  }

  // TODO to implement the dispatch
  onSearch = value => {
    console.log(value);
  };

  // TODO to implement the dispatch
  addToCart = item => {
    console.log(item);
  };

  // TODO to implement the dispatch
  addItem = itemId => {
    console.log(itemId);
  };

  // TODO to implement the dispatch
  removeItem = itemId => {
    console.log(itemId);
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
    return (
      <Fragment>
        <Navbar />
        <div className={styles.container}>
          <Search onSearch={this.onSearch} />
          {this.props.books.length ? (
            this.props.books.map(this.renderBooks)
          ) : (
            <div className={styles.noData}>
              <h2 className={styles.title}>No Data</h2>
            </div>
          )}
        </div>
        {this.props.bookSelected.length ? (
          <ShoppingCart data={this.props.bookSelected} addItem={this.addItem} removeItem={this.removeItem} />
        ) : null}
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  books: state.books,
  bookSelected: state.bookSelected
});

const mapDispatchToProps = dispatch => ({
  getBooks: () => dispatch(actionsCreators.getBooks())
});

App.propTypes = {
  getBooks: func,
  books: arrayOf(bookPropType),
  bookSelected: bookPropType
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
