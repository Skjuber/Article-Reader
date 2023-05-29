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
    removeArticle: (state, action: PayloadAction<Article>) => {
      state.value = state.value.filter(
        (article) => article.title !== action.payload.title
      );
    },
  },
});

export const { addArticle, removeArticle } = favoriteArticlesSlice.actions;

export default favoriteArticlesSlice.reducer;
