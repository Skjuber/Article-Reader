import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { Article } from "./App";
import { addArticle, removeArticle } from "./FavoriteArticlesSlice";

interface ArticleActionsProps {
  article: Article;
}

const ArticleActions: React.FC<ArticleActionsProps> = ({ article }) => {
  const dispatch = useDispatch();

  const handleClick = (article: Article) => {
    dispatch(addArticle(article));
  };

  const handleRemove = (article: Article) => {
    dispatch(removeArticle(article));
  };

  const isArticleBookmarked = useSelector((state: RootState) =>
    state.favoriteArticles.value.some(
      (favorite) => favorite.title === article.title
    )
  );

  return isArticleBookmarked ? (
    <button onClick={handleRemove}>Remove</button>
  ) : (
    <button onClick={handleClick}>Bookmark</button>
  );
};

export default ArticleActions;
