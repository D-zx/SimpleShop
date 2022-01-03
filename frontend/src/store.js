import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage  from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: []
 };

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [thunk];

const store = createStore(
                    persistedReducer,
                    composeWithDevTools(applyMiddleware(...middleware))
                );

const persistor = persistStore(store)

export { store, persistor };