import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import womenDresses from './redux/womenProducts/womenProductSlice/womenDressesSlice'


const reducersToPersist = [womenDresses];

const persistConfig = {
  key: 'root',
  storage,
  whitelist: reducersToPersist
};

const reducers = combineReducers({
  womenDressesList: womenDresses,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

const persistor = persistStore(store);

export { store, persistor };