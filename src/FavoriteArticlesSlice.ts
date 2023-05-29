import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "./App";

interface FavoriteArticlesState {
  value: Article[];
}

const initialState: FavoriteArticlesState = { value: [] };

export const favoriteArticlesSlice = createSlice({
  name: "favoriteArticles",
  initialState,
  reducers: {
    addArticle: (state, action: PayloadAction<Article>) => {
      state.value.push(action.payload);
    },
  },
});

export const { addArticle } = favoriteArticlesSlice.actions;

export default favoriteArticlesSlice.reducer;
