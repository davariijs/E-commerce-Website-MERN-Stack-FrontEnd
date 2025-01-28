import { createSelector } from "@reduxjs/toolkit";

// Updated selectors for each slice based on your structure
// const selectMenCoats = (state) => state.MenCoatsList?.payload?.products || [];
const selectMenCoats = (state) => state.MenCoatsList?.MenCoats?.payload?.products || [];
const selectMenHoodies = (state) => state.MenHoodiesList?.MenHoodies?.payload?.products || [];
const selectMenJeans = (state) => state.MenJeansList?.MenJeans?.payload?.products || [];
const selectMenShoes = (state) => state.MenShoesList?.MenShoes?.payload?.products || [];
const selectMenTops = (state) => state.MenTopsList?.menTops?.payload?.products || [];
const selectMenTShirts= (state) => state.MenTShirtsList?.MenTShirts?.payload?.products || [];
const selectWomenHoodies= (state) => state.WomenHoodiesList?.payload?.products || [];
const selectWomenCoats = (state) => state.WomenCoatsList?.WomenCoats?.payload?.products || [];
const selectWomenDresses = (state) => state.WomenDressesList?.WomenDresses?.payload?.products || [];
const selectWomenShoes = (state) => state.WomenShoesList?.WomenShoes?.payload?.products || [];
const selectWomenTops = (state) => state.womenTopsList?.womenDress?.payload?.products || [];
const selectWomenTShirts = (state) => state.womenTShirtsList?.WomenTShirts?.payload?.products || [];

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