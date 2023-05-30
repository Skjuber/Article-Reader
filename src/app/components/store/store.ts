import { configureStore } from "@reduxjs/toolkit";
import favoriteArticlesReducer from "./reducers/FavoriteArticlesSlice";

export const store = configureStore({
  reducer: {
    favoriteArticles: favoriteArticlesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
