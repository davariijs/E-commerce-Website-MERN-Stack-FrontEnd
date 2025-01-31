import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "src/store";

// Updated selectors for each slice based on your structure
// const selectMenCoats = (state) => state.MenCoatsList?.payload?.products || [];
const selectMenCoats = (state:RootState) => state.MenCoatsList?.MenCoats?.payload?.products || [];
const selectMenHoodies = (state:RootState) => state.MenHoodiesList?.MenHoodies?.payload?.products || [];
const selectMenJeans = (state:RootState) => state.MenJeansList?.MenJeans?.payload?.products || [];
const selectMenShoes = (state:RootState) => state.MenShoesList?.MenShoes?.payload?.products || [];
const selectMenTops = (state:RootState) => state.MenTopsList?.menTops?.payload?.products || [];
const selectMenTShirts= (state:RootState) => state.MenTShirtsList?.MenTShirts?.payload?.products || [];
const selectWomenHoodies= (state:RootState) => state.WomenHoodiesList?.WomenHoodies?.payload?.products || [];
const selectWomenCoats = (state:RootState) => state.WomenCoatsList?.WomenCoats?.payload?.products || [];
const selectWomenDresses = (state:RootState) => state.WomenDressesList?.WomenDresses?.payload?.products || [];
const selectWomenShoes = (state:RootState) => state.WomenShoesList?.WomenShoes?.payload?.products || [];
const selectWomenTops = (state:RootState) => state.womenTopsList?.womenDress?.payload?.products || [];
const selectWomenTShirts = (state:RootState) => state.womenTShirtsList?.WomenTShirts?.payload?.products || [];

// Combine all product data into a single array
export const selectAllProducts = createSelector(
  [
    selectMenCoats,
    selectMenHoodies,
    selectMenJeans,
    selectMenShoes,
    selectMenTops,
    selectWomenCoats,
    selectWomenDresses,
    selectWomenShoes,
    selectWomenTops,
    selectWomenTShirts,
    selectMenTShirts,
    selectWomenHoodies
  ],
  (
    menCoats,
    menHoodies,
    menJeans,
    menShoes,
    menTops,
    menTShirts,
    womenHoodies,
    womenCoats,
    womenDresses,
    womenShoes,
    womenTops,
    womenTShirts
  ) => [
    ...menCoats,
    ...menHoodies,
    ...menJeans,
    ...menShoes,
    ...menTops,
    ...menTShirts,
    ...womenHoodies,
    ...womenCoats,
    ...womenDresses,
    ...womenShoes,
    ...womenTops,
    ...womenTShirts,
  ]
);