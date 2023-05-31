import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "../../utils/types";

interface FavoriteArticlesState {
  value: Article[];
}

// Load initial state from localStorage or set to an empty array
const initialState: FavoriteArticlesState = {
  value: JSON.parse(localStorage.getItem("favoriteArticles") || "[]"),
};

export const favoriteArticlesSlice = createSlice({
  name: "favoriteArticles",
  initialState,
  reducers: {
    addArticle: (state, action: PayloadAction<Article>) => {
      // Only add the article if it's not already in the list
      if (
        !state.value.some((article) => article.title === action.payload.title)
      ) {
        state.value.push(action.payload);
        // Save to localStorage every time we add an article
        localStorage.setItem("favoriteArticles", JSON.stringify(state.value));
      }
    },
    removeArticle: (state, action: PayloadAction<Article>) => {
      state.value = state.value.filter(
        (article) => article.title !== action.payload.title
      );
      // Save to localStorage every time we remove an article
      localStorage.setItem("favoriteArticles", JSON.stringify(state.value));
    },
  },
});

export const { addArticle, removeArticle } = favoriteArticlesSlice.actions;

export default favoriteArticlesSlice.reducer;
