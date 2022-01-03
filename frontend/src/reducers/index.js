import { combineReducers } from 'redux';
import auth from './auth.reducer';
import password from './password.reducer';
import alert from './alert.reducer';
import admin from './admin/index.admin'
import order from './order.reducer'
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage'


const authPersistConfig = {
    key: 'auth',
    storage: storage,
  }

const orderPersistConfig = {
    key: 'order',
    storage: storage,
  }

export default combineReducers({
    alert,
    auth: persistReducer(authPersistConfig, auth),
    password,
    admin,
    order: persistReducer(orderPersistConfig, order)
});