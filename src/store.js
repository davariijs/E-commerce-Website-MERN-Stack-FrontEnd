import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import womenTops from './redux/womenProducts/womenProductSlice/womenTopsSlice';
import filterProducts from './redux/filterProducts/filterProductsSlice';
import womenTShirtsList from './redux/womenProducts/TShirtSlice/tShirtSlice';
import WomenShoesList from './redux/womenProducts/womenShoesSlice/womenShoesSlice';
import WomenCoatsList from './redux/womenProducts/womenCoatsSlice/womenCoatsSlice';
import WomenDressesList from './redux/womenProducts/womenDressesSlice/womenDressesSlice';
import WomenHoodiesList from './redux/womenProducts/womenHoodiesSlice/womenHoodiesSlice';

const reducersToPersist = [womenTops, womenTShirtsList,WomenShoesList,WomenCoatsList,WomenDressesList,WomenHoodiesList];

const persistConfig = {
  key: 'root',
  storage,
  whitelist: reducersToPersist,
};

const reducers = combineReducers({
  womenTopsList: womenTops,
  filterProducts: filterProducts,
  womenTShirtsList:womenTShirtsList,
  WomenShoesList:WomenShoesList,
  WomenCoatsList:WomenCoatsList,
  WomenDressesList:WomenDressesList,
  WomenHoodiesList: WomenHoodiesList,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

const persistor = persistStore(store);

export { store, persistor };