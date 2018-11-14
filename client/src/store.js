import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/';

//init
const initialState = {};

//middleware
const middleware = [thunk];

//create redux store
const store = createStore( 
   rootReducer, 
   initialState, 
   compose(applyMiddleware(...middleware),
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;