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
import menTShirtsList from './redux/menProducts/TShirtSlice/tShirtSlice';
import menShoesList from './redux/menProducts/menShoesSlice/menShoesSlice';
import menCoatsList from './redux/menProducts/menCoatsSlice/menCoatsSlice';
import menJeansList from './redux/menProducts/menJeansSlice/menJeansSlice';
import menHoodiesList from './redux/menProducts/menHoodiesSlice/menHoodiesSlice';
import MenTopsList from './redux/menProducts/menTopsSlice/menTopsSlice';

const reducersToPersist = [
  womenTops,
  womenTShirtsList,
  WomenShoesList,
  WomenCoatsList,
  WomenDressesList,
  WomenHoodiesList,
  menTShirtsList,
  menShoesList,
  menCoatsList,
  menJeansList,
  menHoodiesList,
  MenTopsList
];

const persistConfig = {
  key: 'root',
  storage,
  blacklist: reducersToPersist,
};

const reducers = combineReducers({
  womenTopsList: womenTops,
  filterProducts: filterProducts,
  womenTShirtsList:womenTShirtsList,
  WomenShoesList:WomenShoesList,
  WomenCoatsList:WomenCoatsList,
  WomenDressesList:WomenDressesList,
  WomenHoodiesList: WomenHoodiesList,
  MenTShirtsList:menTShirtsList,
  MenShoesList:menShoesList,
  MenCoatsList:menCoatsList,
  MenJeansList:menJeansList,
  MenHoodiesList:menHoodiesList,
  MenTopsList:MenTopsList
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

const persistor = persistStore(store);

export { store, persistor };