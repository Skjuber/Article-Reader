import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { addArticle, removeArticle } from "./FavoriteArticlesSlice";
import { Article } from "../../utils/types";
import { FiBookmark } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";

interface ArticleActionsProps {
  article: Article;
}

const ArticleActions: React.FC<ArticleActionsProps> = ({ article }) => {
  const favorites = useSelector(
    (state: RootState) => state.favoriteArticles.value
  );
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!favorites.some((favorite) => favorite.title === article.title)) {
      dispatch(addArticle(article));
    } else {
      dispatch(removeArticle(article));
    }
  };

  const isFavorite = favorites.some(
    (favorite) => favorite.title === article.title
  );

  return (
    <button
      onClick={handleClick}
      title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      className="article-action"
    >
      {isFavorite ? <FaBookmark /> : <FiBookmark />}
    </button>
  );
};

export default ArticleActions;
