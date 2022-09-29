import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from '../states/reducer';

const middlewares = [thunk];

const store = createStore(mainReducer, {}, compose(
    applyMiddleware(...middlewares),
));

export default store;
