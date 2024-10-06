import { configureStore } from '@reduxjs/toolkit'
import womenDresses from './redux/womenProducts/womenProductSlice/womenDressesSlice'

export const store = configureStore({
  reducer: {
    womenDressesList: womenDresses,
  },
})