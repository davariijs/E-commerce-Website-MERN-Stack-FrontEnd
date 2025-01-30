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
import ProductsDetailsList from './redux/productDetails/productDetails';
import wishlistReducer from "./redux/wishLists/wishlistSlice";
import cartReducer from './redux/cart/cartSlice';
import userReducer from './redux/users/userSlice'; 

const reducersToPersist = [
  'womenTopsList',
  'womenTShirtsList',
  'WomenShoesList',
  'WomenCoatsList',
  'WomenDressesList',
  'WomenHoodiesList',
  'MenTShirtsList',
  'MenShoesList',
  'MenCoatsList',
  'MenJeansList',
  'MenHoodiesList',
  'MenTopsList',
  'ProductsDetailsList'
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
  MenTopsList:MenTopsList,
  ProductsDetailsList: ProductsDetailsList,
  wishlist: wishlistReducer,
  cart: cartReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false, // Disable immutable state check
      serializableCheck: false, // Disable serializable state check
    }),
});

const persistor = persistStore(store);

export { store, persistor };

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;