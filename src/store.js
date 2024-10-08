import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import womenDresses from './redux/womenProducts/womenProductSlice/womenDressesSlice';
import filterProducts from './redux/filterProducts/filterProductsSlice';
import womenTShirtsList from './redux/womenProducts/TShirtSlice/tShirtSlice';

const reducersToPersist = [womenDresses, womenTShirtsList];

const persistConfig = {
  key: 'root',
  storage,
  blacklist: reducersToPersist
};

const reducers = combineReducers({
  womenDressesList: womenDresses,
  filterProducts: filterProducts,
  womenTShirtsList:womenTShirtsList,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

const persistor = persistStore(store);

export { store, persistor };