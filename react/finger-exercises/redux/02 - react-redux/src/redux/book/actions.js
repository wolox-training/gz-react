import { DATA } from '@constants/data';

/**
 * See the @@BOOKS? That's the namespace.
 * We use it to ensure an action type belongs to only one store branch. Also,
 * we can filter the actions shown by redux dev tools to see only the actions
 * related to @@BOOKS for easier debugging.
 */
export const actions = {
  GET_BOOKS: '@@BOOK/GET_BOOKS',
  ADD_TO_CART: '@@BOOK/ADD_TO_CART',
  ADD_ITEM: '@@BOOK/ADD_ITEM',
  REMOVE_ITEM: '@@BOOK/REMOVE_ITEM',
  SEARCH_ITEM: '@@BOOK/SEARCH_ITEM'
};

const actionsCreators = {
  getBooks: () => ({
    type: actions.GET_BOOKS,
    payload: DATA
  }),
  addToCart: item => ({
    type: actions.ADD_TO_CART,
    payload: item
  }),
  addItem: books => ({
    type: actions.ADD_ITEM,
    payload: books
  }),
  removeItem: books => ({
    type: actions.REMOVE_ITEM,
    payload: books
  }),
  searchBook: books => ({
    type: actions.SEARCH_ITEM,
    payload: books
  })
};

export default actionsCreators;
