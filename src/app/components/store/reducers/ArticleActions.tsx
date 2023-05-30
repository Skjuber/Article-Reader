import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { addArticle, removeArticle } from "./FavoriteArticlesSlice";
import { Article } from "../../../App";

interface ArticleActionsProps {
  article: Article;
}

const ArticleActions: React.FC<ArticleActionsProps> = ({ article }) => {
  const dispatch = useDispatch();

  const isArticleFavorite = useSelector((state: RootState) =>
    state.favoriteArticles.value.some(
      (favorite) => favorite.title === article.title
    )
  );

  const toggleFavorite = () => {
    if (isArticleFavorite) {
      dispatch(removeArticle(article));
    } else {
      dispatch(addArticle(article));
    }
  };

  return (
    <div>
      <button onClick={toggleFavorite}>
        {isArticleFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default ArticleActions;
